"use client";

import { useTranslations } from "next-intl";

export const DefaultPage = () => {
    const t = useTranslations("Concerts");
    const noDataTitle = t("no_data");

    return (
        <div className={"hidden md:flex w-full h-full justify-center items-center"}>
            {noDataTitle}
        </div>
    );
};