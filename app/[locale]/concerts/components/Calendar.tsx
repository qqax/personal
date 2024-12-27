'use client'

import React, {useEffect, useMemo, useState} from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import {Concerts} from "@/app/db/definitions";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/routing";
import {pathWithConcertIDHandler} from "@/app/[locale]/concerts/components/concertPathFn";
import {replaceDynamicSegmentIfExists} from "@/app/utils/pathFuncs";
import {paths} from "@/app/components/navbar/navigation";
import {shiftFromUTCToLocale} from "@/app/utils/dateFuncs";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function ConcertsCalendar({concerts}: { concerts: Concerts }) {
    const [value, onChange] = useState<Value>(null);
    const minDate = concerts[0].date || undefined;
    const maxDate = concerts[concerts.length - 1].date || undefined;
    const locale = useLocale();

    const concertDates = useMemo(() => new Set(
        concerts.map(({date}) => shiftFromUTCToLocale(date))), [concerts]);

    const router = useRouter();
    const path = usePathname();

    const selectNewDate = (value: Value) => {
            onChange(value);
            const concert = concerts.find(({date}) => shiftFromUTCToLocale(date) === (value as ValuePiece)?.getTime());

            concert?.id && replaceDynamicSegmentIfExists(router, path, paths.concerts, concert.id);
    }

    useEffect(() => {
        pathWithConcertIDHandler(path, (id) => {
            const concert = concerts.find((concert) => concert.id === id);
            const activeDate = shiftFromUTCToLocale(concert?.date);
            onChange(new Date(activeDate));
        });
    }, [path]);

    return (
        <Calendar
            onChange={selectNewDate}
            value={value}
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

                if (date.getTime() === (value as ValuePiece)?.getTime()) {
                    return 'react-calendar__tile--highlight'
                }

                return null
            }}
            className={"w-full h-[330px] p-4"}/>
    );
}