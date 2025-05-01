"use client";

import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { lightButtonStyle } from "@/app/ui/styles";
import { ModalCalendar } from "@/app/[locale]/concerts/components/Calendar";
import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { useTranslations } from "next-intl";
import { Select } from "@/app/ui/Select.tsx";
import { ArrowLabel } from "@/app/ui/Label.tsx";

export const ConcertMenu = ({ isCurrentUpcoming, isUpcomingConcertPresented }: {
    isCurrentUpcoming: boolean,
    isUpcomingConcertPresented: boolean,
}) => {
    const t = useTranslations("Titles");
    const title = t("concerts");

    return (
        <h2 className={"fixed z-10 w-full flex gap-6 px-20 shadow-xl py-6 h-[72px] items-center backdrop-blur text-beige text-center lg:w-1/2 text-lg md:text-2xl"}>
            <span className={"block"}>{title}</span>
            {isUpcomingConcertPresented && <ConcertSelect isCurrentUpcoming={isCurrentUpcoming}/>}
            <ModalCalendar/>
        </h2>
    );
};

const ConcertSelect = ({ isCurrentUpcoming }: {
    isCurrentUpcoming: boolean,
}) => {
    const t = useTranslations("Concerts");
    const forgoingTitle = t("forgoing");
    const upcomingTitle = t("upcoming");
    const { scrollTo } = useConcertContext() as ConcertContextType;

    const scrollFn = useCallback(() => {
            setOpen(false);
            if (isCurrentUpcoming) {
                scrollTo?.forgoing();
            } else {
                scrollTo?.upcoming();
            }
        },
        [isCurrentUpcoming]);

    const currentLabel = useMemo(() => isCurrentUpcoming ? upcomingTitle : forgoingTitle, [isCurrentUpcoming]);
    const label = useMemo(() => isCurrentUpcoming ? forgoingTitle : upcomingTitle, [isCurrentUpcoming]);

    const [open, setOpen] = useState(false);

    return (<Select open={open} setOpen={setOpen} className={"w-[8.75rem] "}
                    selectedLabel={<ArrowLabel className={lightButtonStyle}
                                               arrowStyle={{ filter: "invert(100%)" }} open={open}>
                        {currentLabel}
                    </ArrowLabel>}>
        <button key={label} type={"button"} onClick={scrollFn}
                className={clsx(lightButtonStyle, "animate-fade w-full")}>
            {label}
        </button>
    </Select>);
};
