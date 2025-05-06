import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import CountriesSupport from "@/app/[locale]/(home)/support/countriesSupport";
import React from "react";
import clsx from "clsx";
import { homePageStyle, titleStyle } from "@/app/ui/styles";

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

    return (<section className={clsx(homePageStyle, "flex flex-col gap-10 h-full md:max-w-96 w-full mb-16")}>
        <h2 className={titleStyle}>{mainTitle}</h2>
        <CountriesSupport country={country}/>
    </section>);
}
