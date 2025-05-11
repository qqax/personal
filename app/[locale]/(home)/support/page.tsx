import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import CountriesSupport from "@/app/[locale]/(home)/support/countriesSupport";
import React from "react";
import clsx from "clsx";
import { homePageStyle, titleStyle } from "@/app/ui/styles";
import Image from "next/image";
import patreonIcon from "@/public/icons/patreon.svg";

export default async function SupportPage() {
    const t = await getTranslations("Support");
    const mainTitle = t("title");

    const ip = await headers().then(headers => {
        return headers.get("x-forwarded-for");
    });
    let country: string | undefined = undefined;

    if (ip) {
        try {
            const response = await fetch(`https://api.country.is/${ip}`).then(response => response.json());
            country = response?.country;
        } catch (err) {
            console.log(err);
        }
    }

    return (<section className={clsx(homePageStyle, "flex flex-col gap-10 h-full w-full mb-16")}>
        <h2 className={titleStyle}>{mainTitle}</h2>
        <a className={"bg-orange-900 rounded-xl bg-opacity-90 hover:bg-opacity-80 text-amber-50 text-center text-2xl flex items-center gap-2 p-6"}
           href={"https://www.patreon.com/alexanderkudryavtsev/membership?view_as=patron&redirect=true"}>
            <Image
                src={patreonIcon}
                alt={"Patreon"}
                className={"w-5"}
            />
            <span className={"w-full"}>{t("Patreon")}</span>
        </a>
        <CountriesSupport country={country}/>
    </section>);
}
