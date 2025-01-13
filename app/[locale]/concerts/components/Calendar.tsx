'use client'

import React, {useEffect, useMemo, useState} from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import {useLocale} from "next-intl";
import {shiftFromUTCToLocale} from "@/app/utils/dateFuncs";
import {ConcertContextType, useConcertContext} from "@/app/[locale]/concerts/concertPage";

type DateType = Date | null;

type ConcertDateType = DateType | [DateType, DateType];

export function ConcertsCalendar() {
    const {concerts, cursor, setCursor} = useConcertContext() as ConcertContextType;

    const [concertDate, setConcertDate] = useState<ConcertDateType>(null);
    const minDate = concerts[0].date || undefined;
    const maxDate = concerts[concerts.length - 1].date || undefined;
    const locale = useLocale();

    const concertDates = useMemo(() => new Set(
        concerts.map(({date}) => shiftFromUTCToLocale(date))), [concerts]);

    const selectNewDate = (newDate: ConcertDateType) => {
        const concertIndex = concerts.findIndex(({date}) => shiftFromUTCToLocale(date) === (newDate as DateType)?.getTime());
        concertIndex >= 0 && setCursor(concertIndex);
    }

    useEffect(() => {
        const activeDate = shiftFromUTCToLocale(concerts[cursor].date);
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
            tileDisabled={({activeStartDate, date, view}) => {
                return !concertDates.has(date.setHours(0, 0, 0, 0));
            }}
            tileClassName={({date, view}) => {
                if (view !== "month") return;

                if (date.getTime() === (concertDate as DateType)?.getTime()) {
                    return 'react-calendar__tile--highlight'
                }

                return null
            }}
            className={"w-full h-[330px] p-4"}/>
    );
}