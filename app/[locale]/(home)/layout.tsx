'use server'

import Artist from "@/app/components/navbar/artist";
import Social from "@/app/components/social";
import React, {ReactNode} from "react";
import clsx from "clsx";

export default async function HomeLayout({
                                             children,
                                         }: {
    children: ReactNode;
    biography: ReactNode;
    contacts: ReactNode;
}) {
    return (
        <main className={"flex flex-col lg:flex-row w-full"}>
            <div className={"h-auto min-h-screen"}>
                <Artist/>
            </div>
            <div
                className={"fixed bottom-0 left-0 flex-col gap-8 p-4 xl:p-8 mb-4 xl:mb-10 items-center hidden sm:flex"}>
                <Social/>
            </div>
            <div
                className={clsx("flex flex-col items-center min-h-screen mt-auto lg:ml-auto lg:w-1/2 p-10 justify-center bg-amber-50 bg-opacity-75 backdrop-blur-sm")}>
                {children}
            </div>
        </main>
    );
}