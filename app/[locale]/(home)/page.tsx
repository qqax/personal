'use server'

import {getLocale} from "next-intl/server";
import {fetchArtistName, fetchBiography} from "@/app/lib/data";
import Image from "next/image";
import {MDXRemote} from "next-mdx-remote/rsc";
import NewsForm from "@/app/components/forms/newsForm";
import Social from "@/app/components/social";
import React from "react";

export default async function Biography() {
    const locale = await getLocale();
    const name = await fetchArtistName(locale);
    const biography = await fetchBiography(locale);

    return (
            <div>
                <Image
                    src="/portrait.jpg"
                    alt={name || "artist_photo"}
                    width={1177}
                    height={1772}
                    className={"sm:float-right sm:w-1/2 sm:pl-4 sm:max-h-96 sm:max-w-64 object-cover pb-8"}
                    priority
                />
                <h2 className={"text-2xl text-beige mb-8"}>Biography</h2>
                <div className={"prose text-lg leading-tight mb-8"}>
                    <MDXRemote source={biography}/>
                </div>
                <div className={"flex flex-col w-full gap-8"}>
                    <div className={"sm:w-1/2 md:w-full"}>
                        <NewsForm/>
                    </div>
                    <div className={"flex sm:hidden gap-8"}>
                        <Social/>
                    </div>
                </div>
            </div>
    )
}