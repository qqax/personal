"use client";

import { ConcertMenu } from "@/app/[locale]/concerts/components/concertMenu";
import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles";
import { ConcertsCalendar } from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import ConcertView from "@/app/[locale]/concerts/components/concertsList";
import type { Concerts } from "@/app/lib/definitions";
import React, {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo, useRef,
    useState
} from "react";
import { useClickOutside, useMd } from "@/app/components/hooks";
import { usePathname, useRouter } from "@/i18n/routing";
import { replaceDynamicSegmentIfExists } from "@/app/utils/pathFuncs";
import { paths } from "@/app/components/navbar/menuTypes";
import {
    DescriptionHeader
} from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionHeader.tsx";
import Modal from "@/app/ui/Modal.tsx";

export type SelectConcertPeriodFuncType = { forgoing: () => void, upcoming: () => void } | null;

export type ConcertContextType = {
    concerts: Concerts,
    forgoingConcerts: Concerts,
    upcomingConcerts: Concerts,
    currentConcertID: string | undefined,
    areConcertsPresented: boolean,

    currentConcertHandler: (isPresented: boolean) => void,
    setConcertPath: () => void,

    cursor: number,
    setCursor: Dispatch<SetStateAction<number>>,
    setCursorToNext: () => void,
    setCursorToPrev: () => void,

    selectConcertPeriodFunc: SelectConcertPeriodFuncType | null,
    setSelectConcertPeriodFunc: Dispatch<SetStateAction<SelectConcertPeriodFuncType>>,

    setShowModalDescription: Dispatch<SetStateAction<boolean>>,
};

export const ConcertContext = createContext<ConcertContextType | null>(null);

export function useConcertContext() {
    return useContext(ConcertContext);
}

export default function ConcertPage({ children, description, concerts }: {
    children: ReactNode,
    description: ReactNode,
    concerts: Concerts,
}) {
    const [forgoingConcerts, setForgoingConcerts] = useState<Concerts>([]);
    const [upcomingConcerts, setUpcomingConcerts] = useState<Concerts>([]);
    const date = Date.now();

    useEffect(() => {
        const forgoing: Concerts = [];
        const upcoming: Concerts = [];
        concerts.forEach((concert) => {
            if (concert.date.getTime() < date) {
                forgoing.push(concert);
            } else {
                upcoming.push(concert);
            }
        });

        setForgoingConcerts(forgoing);
        setUpcomingConcerts(upcoming);
        setCursor(!!upcoming.length ? forgoing.length : 0);
    }, []);

    const [isCurrentUpcoming, setIsCurrentUpcoming] = useState(false);

    const currentConcertHandler = useCallback((isCurrent: boolean) => {
        if (isCurrentUpcoming !== isCurrent) {
            setIsCurrentUpcoming(isCurrent);
        }
    }, [isCurrentUpcoming]);

    const path = usePathname();
    const router = useRouter();

    const areConcertsPresented = useMemo(() => {
        return concerts.length > 0;
    }, [concerts]);

    const [selectConcertPeriodFunc, setSelectConcertPeriodFunc] = useState(null as SelectConcertPeriodFuncType);

    const [cursor, setCursor] = useState(0);
    const setCursorToNext = useCallback(() => {
        const newCursor = (cursor + 1) % concerts.length;
        setCursor(newCursor);
    }, [setCursor, cursor, concerts]);
    const setCursorToPrev = useCallback(() => {
        const newCursor = cursor === 0 ? concerts.length - 1 : cursor - 1;
        setCursor(newCursor);
    }, [setCursor, cursor, concerts]);

    const currentConcertID = useMemo(() => {
        return concerts[cursor]?.id;
    }, [concerts, cursor]);

    const setConcertPath = () => {
        if (areConcertsPresented && !!currentConcertID) {
            replaceDynamicSegmentIfExists(router, path, paths.concerts, currentConcertID);
        }
    };

    const isMd = useMd();

    useEffect(() => {
        if (isMd || !path.endsWith(paths.concerts)) {
            setConcertPath();
        }
    }, [isMd, cursor]);

    const [showModalDescription, setShowModalDescription] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMd) {
            setShowModalDescription(false);
        }
    }, [isMd]);

    useClickOutside(ref, () => {
        setShowModalDescription(false);
    });

    return (
        <ConcertContext.Provider value={{
            selectConcertPeriodFunc,
            setSelectConcertPeriodFunc,

            concerts,
            forgoingConcerts,
            upcomingConcerts,
            areConcertsPresented,
            setConcertPath,
            currentConcertHandler,
            currentConcertID,

            cursor,
            setCursor,
            setCursorToNext,
            setCursorToPrev,

            setShowModalDescription,
        }}>
            <ConcertMenu isCurrentUpcoming={isCurrentUpcoming}/>
            <section
                className={"relative pt-[72px] sm:pt-[128px] lg:pt-[72px] h-screen w-full"}>
                <div className={"flex w-full h-full"}>
                    <div
                        className={clsx(bgStyle, "hidden xl:block max-h-max max-w-80 p-6 lg:border-[1px] border-beige")}>
                        <ConcertsCalendar/>
                        <NewsForm/>
                    </div>
                    <ConcertView/>
                    <div className={clsx(bgStyle, "relative hidden md:block w-full overflow-hidden")}>
                        <DescriptionHeader date={concerts[cursor]?.date as Date}/>
                        <div className={"absolute -z-10 top-0 h-full pt-[72px] overflow-auto w-full"}>
                            {description}
                        </div>
                    </div>
                    <Modal show={showModalDescription} preventScroll={true}>
                        <div ref={ref}
                             className={clsx(bgStyle, "relative flex flex-col w-full pt-10 h-full mx-auto")}>
                            <button type={"button"} onClick={() => setShowModalDescription(false)}
                                    className={"absolute top-0 right-0 rotate-45 px-4 text-4xl text-beige"}>
                                +
                            </button>
                            <DescriptionHeader date={concerts[cursor]?.date as Date}/>
                            <div className={"absolute -z-10 top-0 h-full pt-[112px] overflow-auto w-full"}>
                                {description}
                            </div>
                        </div>
                    </Modal>
                    {children}
                </div>
            </section>
        </ConcertContext.Provider>
    );
};