import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import CountriesSupport from "@/app/[locale]/(home)/support/countriesSupport";

export default async function SupportPage() {
    const t = await getTranslations("Titles.support");
    const mainTitle = t("title");

    const ip = await headers().then(headers => {
        return headers.get("x-forwarded-for")
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

    return (<section className={"flex flex-col gap-4 h-full w-full"}>
        <h2 className={"text-center text-beige text-2xl"}>{mainTitle}</h2>
        <CountriesSupport country={country}/>
    </section>)
}
