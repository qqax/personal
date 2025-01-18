import "../globals.css";
import {Jura} from 'next/font/google';
import Footer from "@/app/ui/Footer";
import NavBar from "@/app/components/navbar/navBar";
import {Toaster} from "sonner";
import {ReCaptchaProvider} from "next-recaptcha-v3";
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import React from "react";
import {connection} from "next/server";
import {fetchArtistName, fetchArtistProfession} from "@/app/db/data";
import {GoogleAnalytics} from "@next/third-parties/google";

const jura = Jura({subsets: ['latin', 'cyrillic']});

export async function generateMetadata({params}: { params: { locale: string } }) {
    await connection();

    const {locale} = await params;
    const t = await getTranslations('Metadata');
    const artistName = await fetchArtistName(locale);
    const profession = await fetchArtistProfession(locale);

    return {
        title: artistName,
        description: t('description', {name: artistName, profession: profession}),
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale: string) => ({locale}));
}

export default async function RootLayout({
                                             children,
                                             params,
                                         }: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {

    const {locale} = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    await connection();
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body
            className={`${jura.className} relative min-h-screen pb-20 antialiased  text-gray-200`}
        >
        <div className={"bg-[url('../public/keyboard.jpg')] bg-cover"}>
            <NextIntlClientProvider messages={messages}>
                <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
                    <NavBar/>
                    <div className={"flex z-0 justify-center pt-[88px] md:pt-[128px] md:px-10 md:pb-10"}>
                        {children}
                        <Toaster toastOptions={{
                            unstyled: true,
                            classNames: {
                                error: 'p-4 flex items-center gap-2 border-[1px] border-white bg-red-400',
                                success: 'p-4 flex items-center gap-2 border-[1px] border-white bg-green-600',
                                warning: 'p-4 flex items-center gap-2 border-[1px] border-white bg-yellow-400',
                                info: 'p-4 flex items-center gap-2 border-[1px] border-white bg-blue-400',
                            },
                        }}/>
                    </div>
                    <Footer/>
                    <div id="modal-root" className={"z-50"}/>
                </ReCaptchaProvider>
            </NextIntlClientProvider>
        </div>

        </body>
        <GoogleAnalytics gaId="G-MW1B1WP908" />
        </html>
    );
}
