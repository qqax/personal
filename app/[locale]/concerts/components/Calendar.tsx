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

    const shiftedDatesWithIndexes = useMemo(() => {
        const concertsDateMap = new Map<number, number>();

        concerts.forEach(({ date }, index) => {
            const shiftedDate = shiftFromUTCToLocale(date);
            concertsDateMap.set(shiftedDate, index);
        });

        return concertsDateMap;
    }, [concerts]);

    const concertMonths = useMemo(() => new Set(
        concerts.map(({ date }) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            return new Date(year, month, 1).getTime();
        })), [concerts]);

    const selectNewDate = (selectedDate: ConcertDateType) => {
        const newDateTime = new Date((selectedDate as DateType)!.getFullYear(), (selectedDate as DateType)!.getMonth(), (selectedDate as DateType)!.getDate() ).getTime();
        const concertIndex = shiftedDatesWithIndexes.get(newDateTime);

        if (concertIndex === undefined) {
            console.log("concert not found");
            return;
        }

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

        console.log(new Date(activeDate));
    }, [concerts, cursor]);

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
            tileDisabled={({ date, view }) => {
                switch (view) {
                    case "month":
                        return !shiftedDatesWithIndexes.has(date.setHours(0, 0, 0, 0));
                    case "year":
                        date.setDate(1);
                        date.setHours(0, 0, 0, 0);
                        return !concertMonths.has(date.getTime());
                    default:
                        return false;
                }
            }}
            tileClassName={({ date, view }) => {
                switch (view) {
                    case "month":
                        if (date.getTime() === (concertDate as DateType)?.getTime()) {
                            return "react-calendar__tile--highlight";
                        }
                        return null;
                    case "year":
                        if (date.getMonth() === (concertDate as DateType)?.getMonth()
                            && date.getFullYear() === (concertDate as DateType)?.getFullYear()) {
                            return "react-calendar__tile--highlight";
                        }
                        return null;
                    default:
                        return;
                }

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