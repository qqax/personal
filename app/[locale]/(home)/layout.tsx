'use server'

import Artist from "@/app/components/artist";
import Social from "@/app/components/social";
import React, { ReactNode } from "react";
import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles";
import Link from "next/link";

export default async function HomeLayout({
                                             children,
                                         }: {
    children: ReactNode;
}) {
    return (
        <main className={"flex flex-col lg:flex-row w-full overflow-hidden"}>
            <div
                className={"fixed lg:static flex flex-col lg:items-center lg:mt-52 top-20 p-4 sm:pl-10 sm:top-20 w-full lg:w-1/2"}>
                <Artist/>
            </div>
            <div
                className={"fixed flex justify-between items-center lg:items-end w-full lg:w-1/2 max-h-max top-48 nb:top-44 lg:top-auto bottom-0 right-auto lg:left-0 nb:gap-6 sm:gap-8 p-4 xl:p-8 mb-4"}>
                <div className={"flex lg:flex-col items-center gap-4 lg:gap-8"}>
                    <Social/>
                </div>
                <Link href={"/support"}
                      className={"bg-orange-900 text-sm sm:text-base hover:bg-opacity-80 text-amber-50 rounded-sm p-1.5 nb:p-2 lg:p-4"}>Support</Link>
            </div>
            <div
                className={clsx(bgStyle, "flex flex-col mt-[250px] lg:mt-0 lg:justify-center items-center min-h-screen lg:ml-auto lg:w-1/2 p-2 nb:p-5 sm:p-10")}>
                {children}
            </div>
        </main>
    );
}