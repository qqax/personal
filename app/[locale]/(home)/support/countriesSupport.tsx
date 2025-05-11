"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import demir from "@/public/demir.jpg";
import kicb from "@/public/kicb.jpg";
import tinkoff from "@/public/tinkoff.jpg";
import { ExpandableDiv } from "@/app/ui/Expandable";
import { buttonStyle } from "@/app/ui/styles";
import clsx from "clsx";

const CountriesSupport = ({ country }: { country: string | undefined }) => {
    const [openKG, setOpenKG] = useState(country === "KG");
    const [openRU, setOpenRU] = useState(country === "RU");

    useEffect(() => {
        if (!openKG && !openRU) {
            setOpenKG(true);
            setOpenRU(true);
        }
    }, []);

    const t = useTranslations("Support");

    const titleKG = t("KG");
    const titleRU = t("RU");

    return (<>
        <ExpandableDiv open={openKG} setOpen={setOpenKG} title={<span className={"w-full"}>{titleKG}</span>}>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 justify-between h-full w-full"}>
                <BankCard
                    title={t("KICB")}
                    alt={"kicb_bank_qr"}
                    src={kicb}
                    href={"/kicb.jpg"}
                    download={"kicb_bank_qr"}
                />
                <BankCard
                    title={t("Demir")}
                    alt={"demir_bank_qr"}
                    src={demir}
                    href={"/demir.jpg"}
                    download={"demir_bank_qr"}
                />
            </div>
        </ExpandableDiv>
        <ExpandableDiv open={openRU} setOpen={setOpenRU} title={<span className={"w-full"}>{titleRU}</span>}>
            <BankCard
                title={t("Tinkoff")}
                alt={"tinkoff_bank_qr"}
                src={tinkoff}
                href={"/tinkoff.jpg"}
                download={"tinkoff_bank_qr"}
                additional={<span className={"text-xl pt-2"}>{`${t("card")} 2200 7009 5249 1149`}</span>}
            />
        </ExpandableDiv>
    </>);
};

const BankCard = ({
                      title,
                      href,
                      alt,
                      download,
                      src,
                      additional
                  }: {
    title: string;
    href: string;
    alt: string;
    download: string;
    src: StaticImageData;
    additional?: ReactNode;
}) => {
    const t = useTranslations("Support");
    const downloadTitle = t("download");

    return (<div className={"flex flex-col justify-between gap-2 mx-auto pt-4"}>
        <span className={"text-2xl text-beige"}>{title}</span>
        <Image
            src={src}
            alt={alt}
            width={400}
            height={400}/>
        <a className={clsx(buttonStyle, "ml-auto max-w-48 p-2")} href={href} download={download}>{downloadTitle}</a>
        {additional}
    </div>);
};

export default CountriesSupport;