'use client'

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { buttonColors } from "@/app/ui/styles";
import patreonIcon from "@/public/icons/patreon.svg";

const CountriesSupport = ({ country }: { country: string | undefined }) => {
    const [openKG, setOpenKG] = useState(country === "KG");
    const [openRU, setOpenRU] = useState(country === "RU");
    const [openDefault, setOpenDefault] = useState(!country);

    const t = useTranslations("Titles.support");

    const titleKG = t("KG");
    const titleRU = t("RU");
    const titleDefault = t("default");


    return (<>
        <div className={"w-full flex flex-col gap-4"}>
            <button className={clsx(buttonColors, "p-1")} onClick={() => setOpenKG(!openKG)}>{titleKG}</button>
            <div className={clsx(openRU ? "static" : "hidden", "w-full flex flex-col gap-4")}>
                Demir bank:
                <Image
                    src="/demir.jpg"
                    alt={"demir_bank_qr"}
                    width={400}
                    height={400}/>
            </div>
        </div>

        <div className={"w-full flex flex-col gap-4"}>
            <button className={clsx(buttonColors, "p-1")} onClick={() => setOpenRU(!openRU)}>{titleRU}</button>
            <div className={clsx(openRU ? "static" : "hidden", "w-full flex flex-col gap-4")}>
                Tinkoff bank:
                <Image
                    src="/tinkoff.jpg"
                    alt={"tinkoff_bank_qr"}
                    width={400}
                    height={400}/>
                Cart number: 2200 7009 5249 1149
            </div>
        </div>

        <div className={"w-full flex flex-col gap-4"}>
            <button className={clsx(buttonColors, "p-1")}
                    onClick={() => setOpenDefault(!openDefault)}>{titleDefault}</button>
            <div className={clsx(openRU ? "static" : "hidden", "w-full")}>
                <a className={"underline hover:text-beige flex items-center gap-2"}
                   href={"https://www.patreon.com/alexanderkudryavtsev/membership?view_as=patron&redirect=true"}>
                    <Image
                        src={patreonIcon}
                        alt={"Support me on Patreon"}
                        className={"w-5"}
                    />
                    Support me on Patreon</a>
            </div>
        </div>
    </>)
}

export default CountriesSupport;