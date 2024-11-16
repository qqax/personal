import type {Metadata} from "next";
import "./globals.css";
import {Jura} from 'next/font/google';
import NavLinks from '@/app/ui/NavLinks';
import Footer from "@/app/ui/Footer";
import {Toaster} from "sonner";
import {ReCaptchaProvider} from "next-recaptcha-v3";

const jura = Jura({subsets: ['latin', 'cyrillic']});

export const metadata: Metadata = {
    title: "Alexander Kudryavtsev",
    description: "pianist",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${jura.className} relative min-h-screen pb-20 antialiased bg-[url('../public/keyboard.jpg')] bg-cover text-gray-200`}
        >
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <NavLinks/>
            <div className={"flex justify-center p-20"}>
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
        </ReCaptchaProvider>
        </body>
        </html>
    );
}
