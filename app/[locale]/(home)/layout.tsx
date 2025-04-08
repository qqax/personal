'use server'

import Artist from "@/app/components/artist";
import Social from "@/app/components/social";
import React, {ReactNode} from "react";
import clsx from "clsx";

export default async function HomeLayout({
                                             children,
                                         }: {
    children: ReactNode;
}) {
    return (
        <main className={"flex flex-col lg:flex-row w-full overflow-hidden"}>
            <div className={"fixed flex flex-col lg:items-center top-14 nb:top-16 p-4 sm:pl-10 sm:top-20 w-full lg:w-1/2"}>
                <Artist/>
            </div>
            <div
                className={"fixed top-64 lg:bottom-0 right-0 lg:left-0 flex-col gap-8 p-4 xl:p-8 mb-4 xl:mb-10 items-center flex"}>
                <Social/>
            </div>
            <div
                className={clsx("flex flex-col mt-[410px] lg:mt-0 lg:justify-center items-center min-h-screen lg:ml-auto lg:w-1/2 p-2 nb:p-5 sm:p-10 bg-amber-50 bg-opacity-75 backdrop-blur-sm")}>
                {children}
            </div>
        </main>
    );
}