"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import patreonIcon from "@/public/icons/patreon.svg";
import demir from "@/public/demir.jpg";
import kicb from "@/public/kicb.jpg";
import tinkoff from "@/public/tinkoff.jpg";
import { ExpandableDiv } from "@/app/ui/Expandable";
import { buttonColors } from "@/app/ui/styles";
import clsx from "clsx";

const CountriesSupport = ({ country }: { country: string | undefined }) => {
    const [openKG, setOpenKG] = useState(country === "KG");
    const [openRU, setOpenRU] = useState(country === "RU");
    const [openDefault, setOpenDefault] = useState(!country);

    useEffect(() => {
        if (!openKG && !openRU && !openDefault) {
            setOpenKG(true);
            setOpenRU(true);
            setOpenDefault(true);
        }
    }, []);

    const t = useTranslations("Support");

    const titleKG = t("KG");
    const titleRU = t("RU");
    const titleDefault = t("default");
    const download = t("download");

    const divStyle = "flex flex-col mx-auto gap-4 mt-4";

    return (<>
        <ExpandableDiv open={openKG} setOpen={setOpenKG} title={titleKG}>
            <div className={divStyle}>
                <span>{t("KICB")}</span>
                <Image
                    src={kicb}
                    alt={"kicb_bank_qr"}
                    width={400}
                    height={400}/>
                <a className={clsx(buttonColors, "ml-auto max-w-48 p-1")} href={"/demir.jpg"}
                   download="demir_bank_qr">{download}</a>
                <span>{t("Demir")}</span>
                <Image
                    src={demir}
                    alt={"demir_bank_qr"}
                    width={400}
                    height={400}/>
                <a className={clsx(buttonColors, "ml-auto max-w-48 p-1")} href={"/demir.jpg"}
                   download="demir_bank_qr">{download}</a>
            </div>
        </ExpandableDiv>
        <ExpandableDiv open={openRU} setOpen={setOpenRU} title={titleRU}>
            <div className={divStyle}>
                <span>{t("Tinkoff")}</span>
                <Image
                    src={tinkoff}
                    alt={"tinkoff_bank_qr"}
                    width={400}
                    height={400}/>
                <a className={clsx(buttonColors, "ml-auto max-w-48 p-1")} href={"/tinkoff.jpg"}
                   download="tinkoff_bank_qr">{download}</a>
                <span>{`${t("card")} 2200 7009 5249 1149`}</span>
            </div>
        </ExpandableDiv>
        <ExpandableDiv open={openDefault} setOpen={setOpenDefault} title={titleDefault}>
            <div className={divStyle}>
                <a className={"underline hover:text-beige flex items-center gap-2"}
                   href={"https://www.patreon.com/alexanderkudryavtsev/membership?view_as=patron&redirect=true"}>
                    <Image
                        src={patreonIcon}
                        alt={"Support me on Patreon"}
                        className={"w-5"}
                    />
                    {t("Patreon")}</a>
            </div>
        </ExpandableDiv>
    </>);
};

export default CountriesSupport;