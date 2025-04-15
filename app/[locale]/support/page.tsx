import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles";
import { headers } from "next/headers";
import Image from "next/image";

export default async function SupportPage() {
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

    return (<section className={clsx(bgStyle, "flex flex-col gap-4 p-6 m-auto")}>
        <h2>For citizens of Kyrgyzstan:</h2>
        <>{ip}</>
        <Image
            src="/demir.jpg"
            alt={"demir_bank_qr"}
            className={"w-full"}
            width={400}
            height={400}
            priority
        />
    </section>)
}
