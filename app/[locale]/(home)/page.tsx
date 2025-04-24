'use server'

import { getLocale, getTranslations } from "next-intl/server";
import { fetchArtistName, fetchBiography } from "@/app/lib/data";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import NewsForm from "@/app/components/forms/newsForm";
import React from "react";
import BottomMenu from "@/app/components/navbar/bottomMenuLink";
import { MenuTitle } from "@/app/components/navbar/menuTypes";
import Social from "@/app/components/social";

export default async function Biography() {
    const locale = await getLocale();
    const name = await fetchArtistName(locale);
    const biography = await fetchBiography(locale);
    const t = await getTranslations("Titles");
    const title = t("biography");
    const bottomMenuTitles: MenuTitle[] = ["concerts", "records", "contacts"] as const;

    return (
        <div className={"animate-fade"}>
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
            <div className={"flex flex-col w-full mt-14 mb-20 gap-10"}>
                <div className={"sm:w-1/2 md:w-full"}>
                    <NewsForm/>
                </div>
                <div className={"flex lg:hidden justify-center items-center gap-6"}>
                    <Social/>
                </div>
                <BottomMenu titles={bottomMenuTitles}/>
            </div>
        </div>
    )
}