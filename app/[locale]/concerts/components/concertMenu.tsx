'use client'

import {useRef, useState} from "react";
import clsx from "clsx";
import {concertSectionButtonColors} from "@/app/ui/styles";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import Modal from "@/app/ui/Modal";
import {useClickOutside} from "@/app/components/hooks";
import {ConcertContextType, useConcertContext} from "@/app/[locale]/concerts/concertPage";

const buttonStyle = "px-2 h-full";
const selectedButtonStyle = "text-beige underline";

export const ConcertMenu = ({className, isCurrentUpcoming, isUpcomingConcertPresented, firstUpcomingConcertIndex}: {
    className: string,
    isCurrentUpcoming: boolean,
    isUpcomingConcertPresented: boolean,
    firstUpcomingConcertIndex: number
}) => {
    const {setCursor} = useConcertContext() as ConcertContextType;

    const [showCalendar, setShowCalendar] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => {
        setShowCalendar(false)
    });

    return (<>
        <Modal show={showCalendar}>
            <div className={"flex w-full items-center justify-center"}>
                <div ref={ref} className={"bg-black border-[1px] border-white"}>
                    <button type={"button"} className={"block text-3xl pt-2 px-4 ml-auto mr-0"}
                            onClick={() => setShowCalendar(false)}>X
                    </button>
                    <ConcertsCalendar/>
                </div>
            </div>
        </Modal>
        <div
            className={clsx(className, "fixed z-10 left-0 py-4 justify-around w-full text-lg md:text-2xl")}>
            <button type={"button"}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={clsx(concertSectionButtonColors, "xl:hidden text-base p-2 whitespace-nowrap transition duration-150")}>
                Calendar
            </button>
            <div className={"flex justify-between w-full max-w-[300px] md:max-w-[400px] items-center"}>
                <h2 className={"align-middle"}>Concerts:</h2>
                {isUpcomingConcertPresented &&
                    <>
                        <button type={"button"} onClick={() => setCursor(0)}
                                className={clsx(buttonStyle, {[selectedButtonStyle]: !isCurrentUpcoming})}>
                            forgoing
                        </button>
                        /
                        <button type={"button"} onClick={() => setCursor(firstUpcomingConcertIndex)}
                                className={clsx(buttonStyle, {[selectedButtonStyle]: isCurrentUpcoming})}>
                            upcoming
                        </button>
                    </>
                }
            </div>
        </div>
    </>)
}