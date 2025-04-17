'use client';

import { useRef, useState } from "react";
import clsx from "clsx";
import { bgStyle, buttonColors } from "@/app/ui/styles";
import { ConcertsCalendar } from "@/app/[locale]/concerts/components/Calendar";
import Modal from "@/app/ui/Modal";
import { useClickOutside } from "@/app/components/hooks";
import { ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { useTranslations } from "next-intl";

const buttonStyle = "px-2 text-lg h-full";
const selectedButtonStyle = "text-beige underline";

export const ConcertMenu = ({ isCurrentUpcoming, isUpcomingConcertPresented }: {
    isCurrentUpcoming: boolean,
    isUpcomingConcertPresented: boolean,
}) => {
    const t = useTranslations("Titles");
    const title = t("concerts");

    return (
        <div
            className={"fixed z-10 backdrop-blur-md lg:backdrop-blur-0 flex flex-col lg:flex justify-around lg:justify-evenly right-0 w-full lg:w-1/2 text-lg md:text-2xl"}>
            <h2 className={"py-6 h-[72px] align-middle text-beige text-center lg:hidden"}>
                <span className={"sm:hidden lg:inline"}>{title}</span>
            </h2>
            <div className="flex justify-around py-2 sm:py-6 ">
                <ModalCalendar/>
                <div>
                    <ConcertSelect isUpcomingConcertPresented={isUpcomingConcertPresented}
                                   isCurrentUpcoming={isCurrentUpcoming}/>
                </div>
            </div>
        </div>);
};

const ConcertSelect = ({ isCurrentUpcoming, isUpcomingConcertPresented }: {
    isCurrentUpcoming: boolean,
    isUpcomingConcertPresented: boolean,
}) => {
    const { scrollTo } = useConcertContext() as ConcertContextType;

    return (<>
        {isUpcomingConcertPresented &&
            <>
                <button type={"button"} onClick={() => scrollTo?.forgoing()}
                        className={clsx(buttonStyle, { [selectedButtonStyle]: !isCurrentUpcoming })}>
                    forgoing
                </button>
                /
                <button type={"button"} onClick={() => scrollTo?.upcoming()}
                        className={clsx(buttonStyle, { [selectedButtonStyle]: isCurrentUpcoming })}>
                    upcoming
                </button>
            </>
        }
    </>)
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
    return (
        <>
            <Modal show={showCalendar} preventScroll={true}>
                <div className={"flex w-full items-center justify-center"}>
                    <div ref={ref} className={clsx(bgStyle, "items-start p-4")}>
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