'use client'

import {ConcertMenu} from "@/app/[locale]/concerts/components/concertMenu";
import clsx from "clsx";
import {bgStyle, concertSectionButtonColors} from "@/app/ui/styles";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import {SmConcertsList, MdConcertsList} from "@/app/[locale]/concerts/components/concertsList";
import {Concerts} from "@/app/db/definitions";
import {Dispatch, ReactNode, SetStateAction, useCallback, useContext, useState} from "react";
import useWindowDimensions from "@/app/components/hooks";
import {createContext} from "react";

export type ConcertContextType = {
    concerts: Concerts,
    getCurrConcertID: () => string,
    areConcertsPresented: () => boolean,

    currentConcertHandler: (isPresented: boolean) => void,

    cursor: number,
    setCursor: Dispatch<SetStateAction<number>>,
    setCursorToNext: () => void,
    setCursorToPrev: () => void,
};

export const ConcertContext = createContext<ConcertContextType | null>(null)

export function useConcertContext() {
    return useContext(ConcertContext);
}

export default function ConcertPage({children, description, concerts, firstUpcomingConcertIndex}: {
    children: ReactNode,
    description: ReactNode,
    concerts: Concerts,
    firstUpcomingConcertIndex: number
}) {
    const [isCurrentUpcoming, setIsCurrentUpcoming] = useState(false);
    const isUpcomingConcertPresented: boolean = firstUpcomingConcertIndex > 0;

    const currentConcertHandler = useCallback((isCurrent: boolean) => {
        isCurrentUpcoming !== isCurrent && setIsCurrentUpcoming(isCurrent);
    }, [isCurrentUpcoming]);

    const {width} = useWindowDimensions();
    const isMd = width >= 768;

    const [cursor, setCursor] = useState(firstUpcomingConcertIndex > 0 ? firstUpcomingConcertIndex : 0);
    const setCursorToNext = useCallback(() => {
        const newCursor = (cursor + 1) % length;
        setCursor(newCursor);
    }, [setCursor, cursor]);
    const setCursorToPrev = useCallback(() => {
        const newCursor = cursor === 0 ? length - 1 : cursor - 1;
        setCursor(newCursor);
    }, [setCursor, cursor]);
    const getCurrConcertID = useCallback(() => {
        return concerts[cursor].id
    }, [concerts, cursor]);
    const areConcertsPresented = useCallback(() => {
        return concerts.length > 0;
    }, [concerts]);

    return (
        <ConcertContext.Provider value={{concerts, areConcertsPresented, currentConcertHandler, cursor, setCursor, setCursorToNext, setCursorToPrev, getCurrConcertID}}>
            <ConcertMenu className={"top-[88px] flex md:hidden"} concerts={concerts}
                         firstUpcomingConcertIndex={firstUpcomingConcertIndex} isCurrentUpcoming={isCurrentUpcoming}
                         isUpcomingConcertPresented={isUpcomingConcertPresented}/>
            <section
                className={clsx("relative flex md:overflow-auto pt-[73px] w-full md:h-svh xl:gap-8", bgStyle)}>
                <ConcertMenu className={"hidden md:flex top-0"} concerts={concerts}
                             isCurrentUpcoming={isCurrentUpcoming} firstUpcomingConcertIndex={firstUpcomingConcertIndex}
                             isUpcomingConcertPresented={isUpcomingConcertPresented}/>
                <div className={"hidden xl:block pl-2"}>
                    <ConcertsCalendar concerts={concerts}/>
                    <NewsForm buttonClassName={concertSectionButtonColors}/>
                </div>
                {isMd
                    ? <MdConcertsList/>
                    : <SmConcertsList/>}
                <div className={"hidden md:block w-full"}>
                    {description}
                </div>
                {children}
            </section>
        </ConcertContext.Provider>
    );
};