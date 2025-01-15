'use client'

import {ConcertMenu} from "@/app/[locale]/concerts/components/concertMenu";
import clsx from "clsx";
import {bgStyle, concertSectionButtonColors} from "@/app/ui/styles";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import {SmConcertsList, MdConcertsList} from "@/app/[locale]/concerts/components/concertsList";
import {Concerts} from "@/app/db/definitions";
import {Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useMemo, useState} from "react";
import useWindowDimensions from "@/app/components/hooks";
import {createContext} from "react";
import {usePathname, useRouter} from "@/i18n/routing";
import {paths} from "@/app/components/navbar/navigation";
import {replaceDynamicSegmentIfExists} from "@/app/utils/pathFuncs";

export type ScrollConcertType = { first: () => void, upcoming: () => void } | null;

export type ConcertContextType = {
    concerts: Concerts,
    currConcertID: string,
    areConcertsPresented: boolean,

    currentConcertHandler: (isPresented: boolean) => void,
    setConcertPath: () => void,

    cursor: number,
    setCursor: Dispatch<SetStateAction<number>>,
    setCursorToNext: () => void,
    setCursorToPrev: () => void,

    scrollTo: ScrollConcertType | null,
    setScrollToFunc: ( fn: (id: string) => void ) => void,
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
    const path = usePathname();
    const router = useRouter();
    const isMd = width >= 768;

    const [scrollTo, setScrollTo] = useState(null as ScrollConcertType);
    const setScrollToFunc = useCallback((fn: (id: string) => void) => {
        if (!isUpcomingConcertPresented) return;

        setScrollTo( {
            first: () => fn(concerts[0].id),
            upcoming: () => fn(concerts[firstUpcomingConcertIndex].id),
        });
    }, [isUpcomingConcertPresented, setScrollTo, concerts, firstUpcomingConcertIndex]);

    const [cursor, setCursor] = useState(isUpcomingConcertPresented ? firstUpcomingConcertIndex : 0);
    const setCursorToNext = useCallback(() => {
        const newCursor = (cursor + 1) % concerts.length;
        setCursor(newCursor);
    }, [setCursor, cursor, concerts]);
    const setCursorToPrev = useCallback(() => {
        const newCursor = cursor === 0 ? concerts.length - 1 : cursor - 1;
        setCursor(newCursor);
    }, [setCursor, cursor, concerts]);

    const currConcertID = useMemo(() => {
        return concerts[cursor].id
    }, [concerts, cursor]);
    const areConcertsPresented = useMemo(() => {
        return concerts.length > 0;
    }, [concerts]);
    const setConcertPath = () => {
        areConcertsPresented && replaceDynamicSegmentIfExists(router, path, paths.concerts, currConcertID);
    }

    useEffect(() => {
        if (isMd && path.endsWith(paths.concerts)) {
            setConcertPath();
        }
    }, []);

    useEffect(() => {
        if (isMd || !path.endsWith(paths.concerts)) {
            setConcertPath();
        }
    }, [cursor]);

    return (
        <ConcertContext.Provider value={{
            scrollTo,
            setScrollToFunc,

            concerts,
            areConcertsPresented,
            setConcertPath,
            currentConcertHandler,
            currConcertID,

            cursor,
            setCursor,
            setCursorToNext,
            setCursorToPrev,
        }}>
            <ConcertMenu className={"top-[88px] flex md:hidden backdrop-blur-lg"} isCurrentUpcoming={isCurrentUpcoming}
                         isUpcomingConcertPresented={isUpcomingConcertPresented}/>
            <section
                className={clsx("relative flex md:overflow-auto pt-[73px] w-full md:h-svh xl:gap-8", bgStyle)}>
                <ConcertMenu className={"hidden md:flex top-0"} isCurrentUpcoming={isCurrentUpcoming}
                             isUpcomingConcertPresented={isUpcomingConcertPresented}/>
                <div className={"hidden xl:block pl-2"}>
                    <ConcertsCalendar/>
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