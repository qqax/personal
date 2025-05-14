"use client";

import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage.tsx";
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { isWeekday, shiftFromUTCToLocal } from "@/app/utils/dateFuncs.ts";
import clsx from "clsx";

// type Calendar = Map<number, Map<number, number[]>>

function addHighlightedDays(date: Date, currentDate: Date, highlightedDays: Set<number>, month: number, increase: boolean): boolean {
    const adjustedDate = shiftFromUTCToLocal(date);
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + month);
    const adjustedDateMonth = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth());

    if (increase ? adjustedDateMonth.getTime() > targetDate.getTime() : adjustedDateMonth.getTime() < targetDate.getTime()) return true;

    if (adjustedDateMonth.getTime() === targetDate.getTime()) {
        highlightedDays.add(adjustedDate.getDate());
    }

    return false;
}

export default function NewCalendar() {
    const { concerts, cursor, setCursor } = useConcertContext() as ConcertContextType;

    const locale = useLocale();

    // const calendar: Calendar = useMemo(() => concerts.reduce((acc: Calendar, { date }) => {
    //     const adjustedDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    //
    //     const year = adjustedDate.getFullYear();
    //     const month = adjustedDate.getMonth();
    //     const day = adjustedDate.getDate();
    //
    //     if (acc.get(year)?.has(month)) {
    //         acc.get(year)?.set(month, [...acc.get(year)?.get(month) as number[], day]);
    //     } else if (acc.has(year)) {
    //         acc.get(year)?.set(month, [day]);
    //     } else {
    //         const monthMap = new Map();
    //         acc.set(year, monthMap.set(month, [day]));
    //     }
    //
    //     return acc;
    // }, new Map()), [concerts]);

    return <DayView data={concerts} cursor={cursor} setCursor={setCursor} locale={locale}/>;
}

const DayView = ({ data, cursor, setCursor, locale }: {
    data: { date: Date }[],
    cursor: number,
    setCursor: Dispatch<SetStateAction<number>>,
    locale: string,
}) => {
    const monthTitle = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
    }).format(shiftFromUTCToLocal(data[cursor]!.date));

    const [currentDate, setCurrentDate] = useState<Date>(shiftFromUTCToLocal(data[cursor]!.date));

    useEffect(() => {
        setCurrentDate(shiftFromUTCToLocal(data[cursor]!.date));
    }, [cursor, data]);

    const [prevMonthHighlightedDays, setPrevMonthHighlightedDays] = useState(new Set<number>());
    const [currMonthHighlightedDays, setCurrMonthHighlightedDays] = useState(new Set<number>());
    const [nextMonthHighlightedDays, setNextMonthHighlightedDays] = useState(new Set<number>());

    const previousMonthDays = useMemo(() => {
        const previousMonthLastDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const previousMonthLastDate = previousMonthLastDayDate.getDate();
        const offset = previousMonthLastDayDate.getDay();
        const days = [...Array(offset).keys().map(k => (previousMonthLastDate - offset + k))];

        const highlightedDays = new Set<number>();

        if (days.length > 0) {
            for (let i = cursor - 1; i >= 0; i--) {
                addHighlightedDays(data[i]!.date, currentDate, highlightedDays, -1, false);
            }
        }

        setPrevMonthHighlightedDays(highlightedDays);

        return days;
    }, [currentDate, cursor, data]);

    const nextMonthDays = useMemo(() => {
        const lastMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
        const offset = 6 - (lastMonthDay + 6) % 7;
        const days = [...Array(offset).keys().map(k => ++k)];
        const highlightedDays = new Set<number>();

        for (let i = cursor + 1; i < data.length; i++) {
            addHighlightedDays(data[i]!.date, currentDate, highlightedDays, 1, true);
        }

        setNextMonthHighlightedDays(highlightedDays);

        return days;
    }, [currentDate, cursor, data]);

    const monthDays = useMemo(() => {
        const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const days = [...Array(lastMonthDate).keys().map(k => ++k)];

        const highlightedDays = new Set<number>();

        for (let i = cursor + 1; i < data.length; i++) {
            addHighlightedDays(data[i]!.date, currentDate, highlightedDays, 0, true);
        }

        for (let i = cursor; i >= 0; i--) {
            addHighlightedDays(data[i]!.date, currentDate, highlightedDays, 0, false);
        }

        setCurrMonthHighlightedDays(highlightedDays);

        return days;
    }, [currentDate, cursor, data]);

    const dayStyle = "w-full h-full text-center";
    const outOfMonthDayStyle = "text-gray-500";
    const selectedDayStyle = "bg-orange-700 text-white";
    const weekDayStyle = "text-red-600";
    const outOfMonthWeekDayStyle = "text-red-800";

    const buttonStyle = "block min-w-7 h-9 bg-amber-50 hover:bg-opacity-80 rounded shadow disabled:bg-none";

    return (
        <>
            <div className={"flex w-full gap-0.5 justify-between"}>
                <button className={buttonStyle} type={"button"}>{"<<"}</button>
                <button className={buttonStyle} type={"button"}>{"<"}</button>
                <h2 className={"w-full text-center my-auto"}>{monthTitle}</h2>
                <button className={buttonStyle} type={"button"}>{">"}</button>
                <button className={buttonStyle} type={"button"}>{">>"}</button>
            </div>
            <div className={"grid grid-cols-7 w-64"}>
                {previousMonthDays.map((day, index) => <div
                    className={clsx(dayStyle, outOfMonthDayStyle, {
                        [outOfMonthWeekDayStyle]: isWeekday(index + 1),
                        [selectedDayStyle]: prevMonthHighlightedDays.has(day)
                    })}
                    key={day}>{day}</div>)}
                {monthDays.map((day, index) => <div
                    className={clsx(dayStyle, {
                        [weekDayStyle]: isWeekday(previousMonthDays.length + index + 1),
                        [selectedDayStyle]: currMonthHighlightedDays.has(day)
                    })}
                    key={day}>{day}</div>)}
                {nextMonthDays.map((day, index) => <div
                    className={clsx(dayStyle, outOfMonthDayStyle, {
                        [outOfMonthWeekDayStyle]: isWeekday(previousMonthDays.length + monthDays.length + index + 1),
                        [selectedDayStyle]: nextMonthHighlightedDays.has(day)
                    })}
                    key={day}>{day}</div>)}
            </div>
        </>
    );
};