'use client'

import {ConcertMenu} from "@/app/[locale]/concerts/components/concertMenu";
import clsx from "clsx";
import {bgStyle, concertSectionButtonColors} from "@/app/ui/styles";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import {SmConcertsList, ConcertsList} from "@/app/[locale]/concerts/components/ConcertsList";
import {Concerts} from "@/app/db/definitions";
import {ReactNode, useCallback, useState} from "react";
import useWindowDimensions from "@/app/components/hooks";

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
    const cursorHandler = (cursor: number) => setCursor(cursor);

    const initialConcertID = isUpcomingConcertPresented
        ? concerts[firstUpcomingConcertIndex].id
        : concerts[concerts.length - 1].id;

    return (
        <>
            <ConcertMenu className={"top-[88px] flex md:hidden"} concerts={concerts} setCursor={cursorHandler}
                         firstUpcomingConcertIndex={firstUpcomingConcertIndex} isCurrentUpcoming={isCurrentUpcoming}
                         isUpcomingConcertPresented={isUpcomingConcertPresented}/>
            <section
                className={clsx("relative flex md:overflow-auto pt-[73px] w-full md:h-svh xl:gap-8 md:border-[1px] border-green-600", bgStyle)}>
                <ConcertMenu className={"hidden md:flex top-0"} concerts={concerts}
                             isCurrentUpcoming={isCurrentUpcoming} setCursor={cursorHandler}
                             firstUpcomingConcertIndex={firstUpcomingConcertIndex}
                             isUpcomingConcertPresented={isUpcomingConcertPresented}/>
                <div className={"hidden xl:block pl-2"}>
                    <ConcertsCalendar concerts={concerts}/>
                    <NewsForm buttonClassName={concertSectionButtonColors}/>
                </div>
                {isMd
                    ?
                    <ConcertsList concerts={concerts} cursor={cursor} setCursor={cursorHandler}
                                  initialConcertID={initialConcertID} setIsCurrentUpcoming={currentConcertHandler}
                    />
                    : <SmConcertsList concerts={concerts} cursor={cursor} setCursor={cursorHandler}
                                      initialConcertID={initialConcertID} setIsCurrentUpcoming={currentConcertHandler}
                    />}
                <div className={"hidden md:block w-full"}>
                    {description}
                </div>
                {children}
            </section>
        </>
    );
};