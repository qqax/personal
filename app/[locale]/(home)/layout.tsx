'use server'

import Artist from "@/app/components/artist";
import Social from "@/app/components/social";
import React, { type ReactNode } from "react";
import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HomeLayout({
                                             children,
                                         }: {
    children: ReactNode;
}) {
    const t = await getTranslations("Titles");
    const supportButtonText = t("support");

    return (
        <main className={"flex flex-col lg:flex-row w-full overflow-hidden"}>
            <div
                className={"fixed flex flex-col lg:items-center lg:mt-52 top-20 p-4 sm:pl-10 sm:top-20 w-full lg:w-1/2"}>
                <Artist/>
            </div>
            <div
                className={"fixed flex justify-end lg:justify-between items-center lg:items-end w-full lg:w-1/2 max-h-max top-2 sm:top-44 lg:top-auto bottom-0 sm:right-auto lg:left-0 nb:gap-6 sm:gap-8 p-4 xl:p-8 mb-4"}>
                <div className={"hidden lg:flex flex-col items-center gap-8"}>
                    <Social/>
                </div>
                <Link href={"/support"}
                      className={"bg-orange-900 text-sm sm:text-base hover:bg-opacity-80 text-amber-50 p-1.5 nb:p-2 lg:p-4"}>{supportButtonText}</Link>
            </div>
            <div
                className={clsx(bgStyle, "flex flex-col mt-[250px] lg:mt-0 lg:justify-center items-center min-h-screen lg:ml-auto lg:w-1/2")}>
                {children}
            </div>
        </main>
    );
}