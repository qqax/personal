'use client';

import {useRef, useState} from "react";
import clsx from "clsx";
import {buttonColors} from "@/app/ui/styles";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import Modal from "@/app/ui/Modal";
import {useClickOutside} from "@/app/components/hooks";
import {ConcertContextType, useConcertContext} from "@/app/[locale]/concerts/concertPage";

const buttonStyle = "px-2 h-full";
const selectedButtonStyle = "text-beige underline";

export const ConcertMenu = ({isCurrentUpcoming, isUpcomingConcertPresented}: {
    isCurrentUpcoming: boolean,
    isUpcomingConcertPresented: boolean,
}) => {
    const {scrollTo} = useConcertContext() as ConcertContextType;

    return (
        <div className={"fixed flex sm:hidden lg:flex justify-around lg:justify-evenly right-0 w-2/3 lg:w-1/2 py-5 text-lg md:text-2xl"}>
            <h2 className={"align-middle text-beige"}>Concerts:</h2>
            {isUpcomingConcertPresented &&
                <>
                    <button type={"button"} onClick={() => scrollTo?.forgoing()}
                            className={clsx(buttonStyle, {[selectedButtonStyle]: !isCurrentUpcoming})}>
                        forgoing
                    </button>
                    /
                    <button type={"button"} onClick={() => scrollTo?.upcoming()}
                            className={clsx(buttonStyle, {[selectedButtonStyle]: isCurrentUpcoming})}>
                        upcoming
                    </button>
                </>
            }
            <ModalCalendar/>
        </div>);
};

export const ModalCalendar = () => {
    const [showCalendar, setShowCalendar] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const hideCalendar = () => {
        setShowCalendar(false);
    };

    useClickOutside(ref, () => {
        hideCalendar();
    });
    return (
        <>
            <Modal show={showCalendar} preventScroll={true}>
                <div className={"flex w-full items-center justify-center"}>
                    <div ref={ref} className={"bg-black border-[1px] border-white items-start"}>
                        <div className={"text-3xl  w-full text-center"}>
                        <span className={"inline-block mt-4"}>
                        Calendar
                        </span>
                            <button type={"button"} className={"inline-block float-right px-3 py-2 rotate-45"}
                                    onClick={() => setShowCalendar(false)}>+
                            </button>
                        </div>
                        <ConcertsCalendar hideCalendar={hideCalendar}/>
                    </div>
                </div>
            </Modal>
            <button type={"button"}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={clsx(buttonColors, "xl:hidden text-base p-2 whitespace-nowrap transition duration-150")}>
                Calendar
            </button>
        </>)
}