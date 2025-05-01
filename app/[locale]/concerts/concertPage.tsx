"use client";

import { ConcertMenu } from "@/app/[locale]/concerts/components/concertMenu";
import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles";
import { ConcertsCalendar } from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import { MdConcertsList, SmConcertsList } from "@/app/[locale]/concerts/components/concertsList";
import type { Concerts } from "@/app/lib/definitions";
import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { useMd } from "@/app/components/hooks";
import { usePathname, useRouter } from "@/i18n/routing";
import { replaceDynamicSegmentIfExists } from "@/app/utils/pathFuncs";
import { paths } from "@/app/components/navbar/menuTypes";

export type ScrollConcertType = { forgoing: () => void, upcoming: () => void } | null;

export type ConcertContextType = {
    concerts: Concerts,
    currConcertID: string | undefined,
    firstUpcomingConcertID: string | null,
    firstUpcomingConcertIndex: number | null,
    areConcertsPresented: boolean,

    currentConcertHandler: (isPresented: boolean) => void,
    setConcertPath: () => void,

    cursor: number,
    setCursor: Dispatch<SetStateAction<number>>,
    setCursorToNext: () => void,
    setCursorToPrev: () => void,

    scrollTo: ScrollConcertType | null,
    setScrollToFunc: (fn: (id: string) => void) => void,
};

export const ConcertContext = createContext<ConcertContextType | null>(null);

export function useConcertContext() {
    return useContext(ConcertContext);
}

export default function ConcertPage({ children, description, concerts, firstUpcomingConcertIndex }: {
    children: ReactNode,
    description: ReactNode,
    concerts: Concerts,
    firstUpcomingConcertIndex: number
}) {
    const [isCurrentUpcoming, setIsCurrentUpcoming] = useState(false);
    const isUpcomingConcertPresented: boolean = firstUpcomingConcertIndex > 0;

    const currentConcertHandler = useCallback((isCurrent: boolean) => {
        if (isCurrentUpcoming !== isCurrent) {
            setIsCurrentUpcoming(isCurrent);
        }
    }, [isCurrentUpcoming]);

    const path = usePathname();
    const router = useRouter();

    const [scrollTo, setScrollTo] = useState(null as ScrollConcertType);
    const setScrollToFunc = useCallback((fn: (id: string) => void) => {
        if (!isUpcomingConcertPresented) return;

        setScrollTo({
            forgoing: () => fn("forgoing"),
            upcoming: () => concerts[firstUpcomingConcertIndex]?.id
                ? fn(concerts[firstUpcomingConcertIndex]?.id)
                : null,
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
        return concerts[cursor]?.id;
    }, [concerts, cursor]);
    const areConcertsPresented = useMemo(() => {
        return concerts.length > 0;
    }, [concerts]);
    const setConcertPath = () => {
        if (areConcertsPresented && currConcertID) {
            replaceDynamicSegmentIfExists(router, path, paths.concerts, currConcertID);
        }
    };

    const isMd = useMd();

    useEffect(() => {
        if (isMd || !path.endsWith(paths.concerts)) {
            setConcertPath();
        }
    }, [isMd, cursor]);

    return (
        <ConcertContext.Provider value={{
            scrollTo,
            setScrollToFunc,

            concerts,
            firstUpcomingConcertID: concerts[firstUpcomingConcertIndex]?.id || null,
            firstUpcomingConcertIndex,
            areConcertsPresented,
            setConcertPath,
            currentConcertHandler,
            currConcertID,

            cursor,
            setCursor,
            setCursorToNext,
            setCursorToPrev,
        }}>
            <ConcertMenu isCurrentUpcoming={isCurrentUpcoming}
                         isUpcomingConcertPresented={isUpcomingConcertPresented}/>
            <section
                className={"relative mt-36 sm:mt-40 lg:mt-20 flex md:overflow-auto w-full md:h-[88vh] gap-8 m-6"}>
                <div className={clsx(bgStyle, "hidden xl:block max-h-max max-w-80 p-6")}>
                    <ConcertsCalendar/>
                    <NewsForm/>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-8 w-full"}>
                    {isMd ? <MdConcertsList/> : <SmConcertsList/>}
                    {description}
                </div>
                {children}
            </section>
        </ConcertContext.Provider>
    );
};