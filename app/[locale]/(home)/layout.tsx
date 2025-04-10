'use server'

import Artist from "@/app/components/artist";
import Social from "@/app/components/social";
import React, {ReactNode} from "react";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";

export default async function HomeLayout({
                                             children,
                                         }: {
    children: ReactNode;
}) {
    return (
        <main className={"flex flex-col lg:flex-row w-full overflow-hidden"}>
            <div className={"fixed lg:static flex flex-col lg:items-center lg:mt-52 top-20 p-4 sm:pl-10 sm:top-20 w-full lg:w-1/2"}>
                <Artist/>
            </div>
            <div
                className={"fixed top-40 nb:top-32 lg:top-auto lg:bottom-0 right-0 lg:right-auto lg:left-0 flex-col w-14 nb:w-16 sm:w-auto gap-4 nb:gap-6 sm:gap-8 p-4 xl:p-8 mb-4 xl:mb-10 items-center flex"}>
                <Social/>
            </div>
            <div
                className={clsx(bgStyle, "flex flex-col mt-[250px] lg:mt-0 lg:justify-center items-center min-h-screen lg:ml-auto lg:w-1/2 p-2 nb:p-5 sm:p-10")}>
                {children}
            </div>
        </main>
    );
}