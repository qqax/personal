"use client";

import { useMd } from "@/app/components/hooks";
import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles";
import { useTranslations } from "next-intl";

export const DefaultPage = () => {
    const isMd = useMd();
    const t = useTranslations("Concerts");
    const noDataTitle = t("no_data");

    return (
        isMd
            ? <div className={clsx(bgStyle, "flex w-full h-full justify-center items-center")}>{noDataTitle}</div>
            : null
    );
};