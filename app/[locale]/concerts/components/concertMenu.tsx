'use client'

import {useState} from "react";
import clsx from "clsx";
import {concertSectionButtonColors} from "@/app/ui/styles";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import {Concerts} from "@/app/db/definitions";
import Modal from "@/app/ui/Modal";

export const ConcertMenu = ({concerts, className}: { concerts: Concerts, className: string }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    return (<>
        <Modal show={showCalendar}>
            <ConcertsCalendar concerts={concerts}/>
            <button type={"button"} onClick={() => setShowCalendar(false)}>Close</button>
        </Modal>
        <div
            className={clsx(className, "fixed z-10 left-0 bg-black bg-opacity-50 border-b-[1px] border-green-600 backdrop-blur-sm py-4 justify-around w-full text-lg md:text-2xl")}>
            <button type={"button"}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={clsx(concertSectionButtonColors, "xl:hidden text-base p-2 whitespace-nowrap transition duration-150")}>
                Calendar
            </button>
            <div className={"flex justify-between w-full max-w-[300px] md:max-w-[400px] items-center"}>
                <h2 className={"align-middle"}>Concerts:</h2>
                <button type={"button"} className={"px-2 h-full text-beige"}>
                    upcoming
                </button>
                /
                <button type={"button"} className={"px-2 h-full"}>
                    forgoing
                </button>
            </div>
        </div>
    </>)
}