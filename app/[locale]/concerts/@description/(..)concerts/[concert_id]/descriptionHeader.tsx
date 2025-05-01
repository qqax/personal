"use client";

import clsx from "clsx";
import { ConcertDate } from "@/app/[locale]/concerts/components/concertDate";
import { buttonColors } from "@/app/ui/styles";
import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { useTranslations } from "next-intl";

export function DescriptionHeader({ date }: { date: Date }) {
    const { setCursorToNext, setCursorToPrev } = useConcertContext() as ConcertContextType;
    const t = useTranslations("Concerts");
    const previousTitle = t("prev");
    const nextTitle = t("next");

    return (<div className={"flex items-center justify-between gap-3 w-full"}>
        <button type={"button"}
                onClick={() => setCursorToPrev()}
                className={clsx(buttonColors, "p-2 whitespace-nowrap transition duration-150")}>{previousTitle}</button>
        <div className={"md:w-56"}>
            <ConcertDate dateTime={date}/>
        </div>
        <button type={"button"}
                onClick={() => setCursorToNext()}
                className={clsx(buttonColors, "p-2 whitespace-nowrap transition duration-150")}>{nextTitle}</button>
    </div>);
}