'use client'

import {useState} from "react";
import clsx from "clsx";
import {concertSectionButtonColors} from "@/app/ui/styles";
import {Modal} from "@/app/ui/Modal";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import {Concerts} from "@/app/db/definitions";

export const ConcertMenu = ({concerts}: { concerts: Concerts }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    return (<>
        <Modal show={showCalendar}>
            <ConcertsCalendar concerts={concerts}/>
            <button type={"button"} onClick={() => setShowCalendar(false)}>Close</button>
        </Modal>
        <div
            className={clsx("fixed top-0 left-0 bg-black bg-opacity-75  xl:hidden flex justify-around w-full text-3xl")}>
            <button type={"button"}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={clsx(concertSectionButtonColors, "text-base p-2 whitespace-nowrap transition duration-150")}>
                Calendar
            </button>
            <h2 className={"align-middle"}>Concerts:</h2>
            <button type={"button"} className={"px-2 h-full text-beige"}>
                upcoming
            </button>
            /
            <button type={"button"} className={"px-2 h-full"}>
                forgoing
            </button>
        </div>
    </>)
}