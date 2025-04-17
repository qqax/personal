import { headers } from "next/headers";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function SupportPage() {
    const t = await getTranslations("Titles.support");
    const mainTitle = t("title");
    const titleKG = t("KG");
    const titleRU = t("RU");
    const titleDefault = t("default");

    const ip = await headers().then(headers => {
        return headers.get("x-forwarded-for")
    });
    let country
    if (ip) {
        try {
            country = await fetch(`https://api.country.is/${ip}`);
            console.log(country);
        } catch (err) {
            console.log(err);
        }
    }

    return (<section className={"flex flex-col gap-4"}>
        <h2>{mainTitle}</h2>
        <h3>{titleKG}</h3>
        <Image
            src="/demir.jpg"
            alt={"demir_bank_qr"}
            className={"w-full"}
            width={400}
            height={400}
            priority/>
        <h3>{titleRU}</h3>
        <h3>{titleDefault}</h3>

        <>{ip}</>

    </section>)
}
