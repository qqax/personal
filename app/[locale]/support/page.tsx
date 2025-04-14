import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles";
import { headers } from "next/headers";

export default async function SupportPage() {
    const ip = await headers().then(headers => {
        return headers.get("x-forwarded-for")
    });
    let country
    if (ip) {
        try {
            country = await fetch(`https://api.country.is/${ip}`);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(ip, country);
    return (<section className={clsx(bgStyle, "p-6")}>
        <h2>Support as</h2>
    </section>)
}
