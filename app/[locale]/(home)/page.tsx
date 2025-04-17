'use server'

import { getLocale, getTranslations } from "next-intl/server";
import { fetchArtistName, fetchBiography } from "@/app/lib/data";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import NewsForm from "@/app/components/forms/newsForm";
import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { buttonColors } from "@/app/ui/styles";

export default async function Biography() {
    const locale = await getLocale();
    const name = await fetchArtistName(locale);
    const biography = await fetchBiography(locale);
    const t = await getTranslations("Titles");
    const title = t("biography");

    return (
        <div>
            <Image
                src="/portrait.jpg"
                alt={name || "artist_photo"}
                width={1177}
                height={1772}
                className={"nb:float-right nb:w-1/2 nb:pl-4 nb:max-h-96 nb:max-w-64 object-cover pb-8"}
                priority
            />
            <h2 className={"text-2xl text-beige mb-8"}>{title}</h2>
            <div className={"prose text-lg leading-tight mb-8"}>
                <MDXRemote source={biography}/>
            </div>
            <div className={"flex flex-col w-full gap-8 mb-20"}>
                <div className={"sm:w-1/2 md:w-full"}>
                    <NewsForm/>
                </div>
                <div className={"flex w-full sm:hidden gap-8 justify-between"}>
                    <Link href={"/concerts"} className={clsx(buttonColors, "w-full text-center py-1")}>Concerts</Link>
                    <Link href={"/records"} className={clsx(buttonColors, "w-full text-center p-1")}>Records</Link>
                    <Link href={"/contact"} className={clsx(buttonColors, "w-full text-center p-1")}>Contact</Link>
                </div>
            </div>
        </div>
    )
}