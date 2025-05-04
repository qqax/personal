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
    type Dispatch, type MutableRefObject,
    type ReactNode,
    type SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { useMd } from "@/app/components/hooks";
import { usePathname, useRouter } from "@/i18n/routing";
import { replaceDynamicSegmentIfExists } from "@/app/utils/pathFuncs";
import { paths } from "@/app/components/navbar/menuTypes";

export type ScrollConcertType = { forgoing: () => void, upcoming: () => void } | null;

export type ConcertContextType = {
    concerts: Concerts,
    forgoingConcerts: Concerts,
    upcomingConcerts: Concerts,
    currConcertID: string | undefined,
    areConcertsPresented: boolean,

    concertRefs: MutableRefObject<Record<string, HTMLLIElement>>,

    currentConcertHandler: (isPresented: boolean) => void,
    setConcertPath: () => void,

    cursor: number,
    setCursor: Dispatch<SetStateAction<number>>,
    setCursorToNext: () => void,
    setCursorToPrev: () => void,

    initialOffsetTop: number | undefined,

    scrollTo: ScrollConcertType | null,
    setScrollToFunc: (fn: (offset: number) => void) => void,
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

    const concertRefs: MutableRefObject<Record<string, HTMLLIElement>> = useRef({});
    const initialOffsetTop = useMemo(() => {
        if (!forgoingConcerts.length && !upcomingConcerts.length) {
            return undefined;
        }

        if (!upcomingConcerts.length) {
            return 0;
        }

        const firstConcertID  = upcomingConcerts[0]?.id as string;

        return concertRefs.current[firstConcertID]?.offsetTop as number;
    }, [forgoingConcerts.length, upcomingConcerts]);


    const [scrollTo, setScrollTo] = useState(null as ScrollConcertType);
    const setScrollToFunc = useCallback((fn: (offset: number) => void) => {
        if (initialOffsetTop === undefined) return;

        setScrollTo({
            forgoing: () => fn(0),
            upcoming: () => fn(initialOffsetTop),
        });
    }, [forgoingConcerts.length, upcomingConcerts.length]);

    const [cursor, setCursor] = useState(0);
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
        if (areConcertsPresented && !!currConcertID) {
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
            forgoingConcerts,
            upcomingConcerts,
            areConcertsPresented,
            setConcertPath,
            currentConcertHandler,
            currConcertID,

            concertRefs,
            initialOffsetTop,

            cursor,
            setCursor,
            setCursorToNext,
            setCursorToPrev,
        }}>
            <ConcertMenu isCurrentUpcoming={isCurrentUpcoming}/>
            <section
                className={"relative mt-24 sm:mt-40 lg:mt-20 flex md:overflow-auto w-full md:h-[88vh] gap-8 m-6"}>
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