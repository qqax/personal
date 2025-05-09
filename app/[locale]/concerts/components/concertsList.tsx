"use client";

import {
    type KeyboardEventHandler,
    type MutableRefObject,
    type RefObject,
    type UIEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import clsx from "clsx";
import { ConcertDate } from "@/app/[locale]/concerts/components/concertDate";
import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { bgStyle } from "@/app/ui/styles";
import { useTranslations } from "next-intl";
import type { Concerts } from "@/app/lib/definitions.ts";
import { useMd } from "@/app/components/hooks.ts";

export default function ConcertView() {
    const {
        cursor,
        currentConcertID,
        setSelectConcertPeriodFunc,
        setCursorToNext,
        setCursorToPrev,
        forgoingConcerts,
        upcomingConcerts,
        areConcertsPresented,
        currentConcertHandler,
    } = useConcertContext() as ConcertContextType;

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setCursorToNext();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setCursorToPrev();
        }
    }, [setCursorToNext, setCursorToPrev]);

    const concertRefs: MutableRefObject<Record<string, HTMLLIElement>> = useRef({});

    const [initialOffsetTop, setInitialOffsetTop] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (areConcertsPresented) {
            if (!upcomingConcerts.length) {
                setInitialOffsetTop(0);

            } else {
                const firstConcertID = upcomingConcerts[0]?.id as string;
                setInitialOffsetTop(concertRefs.current[firstConcertID]?.offsetTop as number);
            }
        }
    }, [areConcertsPresented, upcomingConcerts]);

    const scrollTo = useCallback((offsetTop: number) => {
        ulRef.current?.scrollTo({ top: offsetTop });
    }, []);

    useEffect(() => {
        if (initialOffsetTop === undefined) return;

        setSelectConcertPeriodFunc({
            forgoing: () => scrollTo(0),
            upcoming: () => scrollTo(initialOffsetTop),
        });
    }, [initialOffsetTop, scrollTo, setSelectConcertPeriodFunc]);

    const ulRef: RefObject<HTMLDivElement> = useRef(null);

    const onUlScroll: UIEventHandler<HTMLDivElement> = (e) => {
        if (initialOffsetTop) {
            currentConcertHandler(Math.round((e.target as HTMLElement).scrollTop) >= initialOffsetTop);
        }
    };

    const [preventScroll, setPreventScroll] = useState(false);

    const focusOnConcert = () => {
        const currentRef = currentConcertID ? concertRefs.current[currentConcertID] : undefined;

        if (!!currentRef) {
            currentRef.focus();
        }

        if (preventScroll) {
            setPreventScroll(false);
        } else if (!!currentRef) {
            scrollTo(currentRef.offsetTop);
        }
    };

    useEffect(() => {
        focusOnConcert();
    }, [cursor]);

    const t = useTranslations("Concerts");

    return (
        <div ref={ulRef} onScroll={onUlScroll}
             className={"relative flex flex-col gap-6 mx-auto w-full min-w-64 overflow-auto scroll-smooth"}
             onKeyDown={onKeyDown}>
            {!!forgoingConcerts.length &&
                <ListItems title={t("forgoing_concerts")}
                           concerts={forgoingConcerts}
                           concertRefs={concertRefs}
                           setPreventScroll={setPreventScroll}/>}
            {!!upcomingConcerts.length &&
                <ListItems ulClassName={"min-h-screen"}
                           addToIndex={!!forgoingConcerts.length ? forgoingConcerts.length : 0}
                           title={t("upcoming_concerts")}
                           concerts={upcomingConcerts}
                           concertRefs={concertRefs}
                           setPreventScroll={setPreventScroll}/>}
        </div>
    );
};

const ListItems = ({ title, concerts, addToIndex, setPreventScroll, ulClassName, concertRefs }: {
    title: string,
    concerts: Concerts,
    addToIndex?: number,
    ulClassName?: string,
    setPreventScroll: (v: boolean) => void,
    concertRefs: MutableRefObject<Record<string, HTMLLIElement>>,
}) => {
    const {
        cursor,
        setCursor,
        setConcertPath,
        setShowModalDescription,
    } = useConcertContext() as ConcertContextType;

    const t = useTranslations("Concerts");
    const moreTitle = t("more");

    const isMd = useMd();

    const onClick = useCallback((adjustedIndex: number) => {
        setCursor(adjustedIndex);
        setConcertPath();
        setPreventScroll(true);
        if (!isMd) {
            setShowModalDescription(true);
        }
    }, [isMd, setConcertPath, setCursor, setPreventScroll, setShowModalDescription]);

    return (<ul className={clsx({ [ulClassName!]: !!ulClassName }, "flex flex-col gap-6")}>
            {concerts.map((concert, index) => {
                const adjustedIndex = addToIndex ? addToIndex + index : index;

                return (
                    <li key={concert.id} ref={element => {
                        if (element) {
                            concertRefs.current[concert.id] = element;
                        } else {
                            delete concertRefs.current[concert.id];
                        }
                    }}>
                        {index === 0 &&
                            <h3 className={"text-beige text-xl p-4 backdrop-blur bg-amber-50 bg-opacity-35 mb-4"}>
                                {title}
                            </h3>
                        }

                        <button
                            id={concert.id}
                            onClick={() => onClick(adjustedIndex)}
                            tabIndex={adjustedIndex}
                            onFocus={() => setCursor(adjustedIndex)}
                            type={"button"}

                            className={clsx(
                                bgStyle,
                                { "border-opacity-100   ": adjustedIndex === cursor },
                                "flex flex-col border-2 border-beige border-opacity-0 gap-1.5 w-full text-left outline-0 p-4")}>
                            <ConcertDate dateTime={concert.date as Date}/>
                            <p>{concert.place}</p>
                            <p>{concert.short_description}</p>
                            <span className={"text-beige ml-auto md:hidden"}>{moreTitle}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};