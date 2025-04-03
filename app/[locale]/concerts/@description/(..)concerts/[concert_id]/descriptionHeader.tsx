'use client';

import clsx from "clsx";
import {ConcertDate} from "@/app/[locale]/concerts/components/concertDate";
import {buttonColors} from "@/app/ui/styles";
import {ConcertContextType, useConcertContext} from "@/app/[locale]/concerts/concertPage";

export function DescriptionHeader({date}: { date: Date }) {
    const {setCursorToNext, setCursorToPrev} = useConcertContext() as ConcertContextType;

    return (<div className={"flex items-center justify-between gap-3 w-full"}>
        <button type={"button"}
                onClick={() => setCursorToPrev()}
                className={clsx(buttonColors, "p-2 whitespace-nowrap transition duration-150")}>{"< Prev"}</button>
        <div className={"md:w-56"}>
            <ConcertDate dateTime={date}/>
        </div>
        <button type={"button"}
                onClick={() => setCursorToNext()}
                className={clsx(buttonColors, "p-2 whitespace-nowrap transition duration-150")}>{"Next >"}</button>
    </div>);
}