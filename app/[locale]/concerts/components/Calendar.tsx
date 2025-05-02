"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { useLocale, useTranslations } from "next-intl";
import { shiftFromUTCToLocale } from "@/app/utils/dateFuncs";
import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { useClickOutside } from "@/app/components/hooks.ts";
import Modal from "@/app/ui/Modal.tsx";
import clsx from "clsx";
import { bgStyle, lightButtonStyle } from "@/app/ui/styles.ts";
import calendarIcon from "@/public/icons/calendar.svg";
import Image from "next/image";

type DateType = Date | null;

type ConcertDateType = DateType | [DateType, DateType];

export function ConcertsCalendar({ hideCalendar }: { hideCalendar?: () => void }) {
    const { concerts, cursor, setCursor } = useConcertContext() as ConcertContextType;

    const [concertDate, setConcertDate] = useState<ConcertDateType>(null);
    const minDate = concerts[0]?.date || undefined;
    const maxDate = concerts[concerts.length - 1]?.date || undefined;
    const locale = useLocale();

    const concertDates = useMemo(() => new Set(
        concerts.map(({ date }) => shiftFromUTCToLocale(date))), [concerts]);

    const selectNewDate = (newDate: ConcertDateType) => {
        const concertIndex = concerts.findIndex(({ date }) => shiftFromUTCToLocale(date) === (newDate as DateType)?.getTime());
        if (concertIndex >= 0) {
            setCursor(concertIndex);
        }
        if (!!hideCalendar) {
            hideCalendar();
        }
    };

    useEffect(() => {
        const activeDate = shiftFromUTCToLocale(concerts[cursor]?.date);
        setConcertDate(new Date(activeDate));
    }, [cursor]);

    return (
        <Calendar
            onChange={selectNewDate}
            value={concertDate}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            minDetail={"year"}
            navigationAriaLabel={"Go up"}
            navigationAriaLive={"polite"}
            next2AriaLabel={"Jump forwards"}
            nextAriaLabel={"Next"}
            prev2AriaLabel={"Jump backwards"}
            prevAriaLabel={"Previous"}
            tileDisabled={({ date }) => {
                return !concertDates.has(date.setHours(0, 0, 0, 0));
            }}
            tileClassName={({ date, view }) => {
                if (view !== "month") return;

                if (date.getTime() === (concertDate as DateType)?.getTime()) {
                    return "react-calendar__tile--highlight";
                }

                return null;
            }}
            className={"w-full h-[330px]"}/>
    );
}

export const ModalCalendar = () => {
    const [showCalendar, setShowCalendar] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const hideCalendar = () => {
        setShowCalendar(false);
    };

    useClickOutside(ref, () => {
        hideCalendar();
    });

    const t = useTranslations("Concerts");
    const calendarTitle = t("calendar");
    return (
        <>
            <Modal show={showCalendar} preventScroll={true}>
                <div className={"flex w-full items-center justify-center"}>
                    <div ref={ref} className={clsx(bgStyle, "items-start p-4")}>
                        <button type={"button"}
                                className={"fixed top-0 right-0 text-3xl inline-block float-right px-3 py-2 rotate-45"}
                                onClick={() => setShowCalendar(false)}>+
                        </button>
                        <div className={"text-3xl w-full text-center"}>
                            <span className={"inline-block mb-6 mt-2"}>{calendarTitle}</span>
                        </div>
                        <ConcertsCalendar hideCalendar={hideCalendar}/>
                    </div>
                </div>
            </Modal>
            <button type={"button"}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={clsx(lightButtonStyle, "xl:hidden sm:px-4 sm:py-1 whitespace-nowrap transition duration-150")}>
                <span className={"hidden sm:inline w-10"}>{calendarTitle}</span>
                <Image
                    src={calendarIcon}
                    alt={calendarTitle}
                    style={{ filter: "invert(29%) sepia(5%) saturate(2153%) hue-rotate(353deg) brightness(96%) contrast(86%)" }}
                    className={"w-10 sm:hidden"}
                />
            </button>
        </>);
};