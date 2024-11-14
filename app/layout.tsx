import type {Metadata} from "next";
import "./globals.css";
import {Jura} from 'next/font/google';
import NavLinks from '@/app/ui/NavLinks';
import Footer from "@/app/ui/Footer";
import {Toaster} from "sonner";

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
        <NavLinks/>
        <div className={"flex justify-center p-20"}>
            {children}
            <Toaster />
        </div>
        <Footer/>
        </body>
        </html>
    );
}
