"use client";

import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { lightButtonStyle } from "@/app/ui/styles";
import { ModalCalendar } from "@/app/[locale]/concerts/components/Calendar";
import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { useTranslations } from "next-intl";
import { Select } from "@/app/ui/Select.tsx";
import { ArrowLabel } from "@/app/ui/Label.tsx";

export const ConcertMenu = ({ isCurrentUpcoming }: {
    isCurrentUpcoming: boolean,
}) => {
    const {
        selectConcertPeriodFunc,
    } = useConcertContext() as ConcertContextType;

    const t = useTranslations("Titles");
    const title = t("concerts");

    return (
        <h2 className={"fixed z-50 justify-between sm:top-[72px] lg:top-0 lg:right-0 w-full lg:px-6 flex gap-6 pl-20 pr-4 nb:pr-10 sm:pr-20 py-0 h-[72px] sm:h-14 lg:h-[72px] sm:bg-amber-100 lg:bg-transparent sm:bg-opacity-20 sm:backdrop-blur lg:backdrop-blur-none items-center text-beige text-center lg:w-1/2 text-lg md:text-2xl"}>
            <span className={clsx({ "hidden": !!selectConcertPeriodFunc }, "lg:block")}>{title}</span>
            {!!selectConcertPeriodFunc && <ConcertSelect isCurrentUpcoming={isCurrentUpcoming}/>}
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
    const {
        selectConcertPeriodFunc,
    } = useConcertContext() as ConcertContextType;

    const scrollFn = useCallback(() => {
            setOpen(false);
            if (isCurrentUpcoming) {
                selectConcertPeriodFunc?.forgoing();
            } else {
                selectConcertPeriodFunc?.upcoming();
            }
        },
        [isCurrentUpcoming]);

    const currentLabel = useMemo(() => isCurrentUpcoming ? upcomingTitle : forgoingTitle, [isCurrentUpcoming]);
    const label = useMemo(() => isCurrentUpcoming ? forgoingTitle : upcomingTitle, [isCurrentUpcoming]);

    const [open, setOpen] = useState(false);

    return (<div className={"w-[8.75rem] mx-auto"}>
        <Select open={open} setOpen={setOpen} className={"w-full"}
                selectedLabel={<ArrowLabel className={clsx(lightButtonStyle, "py-1 pr-2 bg-amber-50")}
                                           arrowStyle={{ filter: "invert(29%) sepia(5%) saturate(2153%) hue-rotate(353deg) brightness(96%) contrast(86%)" }}
                                           open={open}>
                    {currentLabel}
                </ArrowLabel>}>
            <button key={label} type={"button"} onClick={scrollFn}
                    className={clsx(lightButtonStyle, "py-1 pl-[1.625rem] pr-2 animate-fade w-[8.75rem] text-left")}>
                {label}
            </button>
        </Select>
    </div>);
};
