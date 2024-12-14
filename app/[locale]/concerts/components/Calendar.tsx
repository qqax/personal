'use client'

import React, {useEffect, useMemo, useState} from "react";
import Calendar from "react-calendar";
import {ConcertsData} from "@/app/db/definitions";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/routing";
import {pathWithConcertIDHandler} from "@/app/[locale]/concerts/components/concertPathFn";
import {replaceDynamicSegmentIfExists} from "@/app/utils/pathFuncs";
import {paths} from "@/app/components/navbar/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function ConcertsCalendar({concerts, firstUpcomingConcertIndex}: ConcertsData) {
    const [value, onChange] = useState<Value>(new Date());
    const minDate = concerts[0].date || undefined;
    const maxDate = concerts[concerts.length - 1].date || undefined;
    const locale = useLocale();

    const concertDates = useMemo(() => new Set(concerts.map(({date}) =>
            new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()).getTime())),
        [concerts]);

    const router = useRouter();
    const path = usePathname();

    const pushPath = (id: string) => {
        replaceDynamicSegmentIfExists(router, path, paths.concerts, id);
    }

    useEffect(() => {
        pathWithConcertIDHandler(path, (id) => {
            const concert = concerts.find((concert) => concert.id === id);
        });
    }, [path]);

    return (
        <Calendar
            defaultValue={value}
            onChange={onChange}
            value={value}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            minDetail={"year"}
            navigationAriaLabel={"Go up"}
            navigationAriaLive={"polite"}
            next2AriaLabel={"Jump forwards"}
            tileDisabled={({activeStartDate, date, view}) => {
                return !concertDates.has(date.setHours(0, 0, 0, 0));
            }}
            // tileClassName={({date, view}) => {
            //     if (view !== "month") return;
            //
            //     return schedule
            //         .map(({date}) => new Date(date).setHours(0, 0, 0, 0))
            //         .includes(date.setHours(0, 0, 0, 0)) && 'react-calendar__tile--highlight'
            // }}
            className={"w-full h-[391px] p-4"}/>
    );
}