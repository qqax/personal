'use client'

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { buttonColors } from "@/app/ui/styles";

const CountriesSupport = ({country}: {country: string | undefined}) => {
    const [openKG, setOpenKG] = useState(country === "KG");
    const [openRU, setOpenRU] = useState(country === "RU");
    const [openDefault, setOpenDefault] = useState(!country);

    const t = useTranslations("Titles.support");

    const titleKG = t("KG");
    const titleRU = t("RU");
    const titleDefault = t("default");


    return (<>
        <button className={clsx(buttonColors, "p-1")} onClick={() => setOpenKG(!openKG)}>{titleKG}</button>
        <Image
            src="/demir.jpg"
            alt={"demir_bank_qr"}
            className={clsx(openKG ? "static" : "hidden", "w-full")}
            width={400}
            height={400}
            priority/>
        <button className={clsx(buttonColors, "p-1")} onClick={() => setOpenRU(!openRU)}>{titleRU}</button>
        <Image
            src="/demir.jpg"
            alt={"demir_bank_qr"}
            className={clsx(openRU ? "static" : "hidden", "w-full")}
            width={400}
            height={400}
            priority/>
        <button className={clsx(buttonColors, "p-1")} onClick={() => setOpenDefault(!openDefault)}>{titleDefault}</button>
        <Image
            src="/demir.jpg"
            alt={"demir_bank_qr"}
            className={clsx(openDefault ? "static" : "hidden", "w-full")}
            width={400}
            height={400}
            priority/>
    </>)
}

export default CountriesSupport;