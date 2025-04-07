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
            <Artist/>
            <div
                className={"fixed bottom-48 sm:bottom-0 left-0 flex-col gap-8 p-4 xl:p-8 mb-4 xl:mb-10 items-center flex"}>
                <Social/>
            </div>
            <div
                className={clsx("flex flex-col mt-[540px] items-center min-h-screen lg:ml-auto lg:w-1/2 p-10 justify-center bg-amber-50 bg-opacity-75 backdrop-blur-sm")}>
                {children}
            </div>
        </main>
    );
}