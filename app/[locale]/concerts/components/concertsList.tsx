"use client";

import {
    type KeyboardEventHandler,
    type RefObject,
    type UIEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import clsx from "clsx";
import { ConcertDate } from "@/app/[locale]/concerts/components/concertDate";
import { useScroll } from "@/app/components/hooks";
import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { bgStyle } from "@/app/ui/styles";
import { useTranslations } from "next-intl";
import type { Concerts } from "@/app/lib/definitions.ts";

export function SmConcertsList() {
    const {
        areConcertsPresented,
        currentConcertHandler,
        initialOffsetTop,
    } = useConcertContext() as ConcertContextType;

    const scrollTo = (offsetTop: number) => {
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
    };

    useScroll(() => {
        if (areConcertsPresented && !!initialOffsetTop) {
            currentConcertHandler(
                Math.round(window.scrollY) >= initialOffsetTop - 100,
            );
        }
    });

    return (<ConcertView scrollTo={scrollTo} setFocusOnMount={true}/>);
}

export function MdConcertsList() {
    const {
        currentConcertHandler,
        initialOffsetTop,
    } = useConcertContext() as ConcertContextType;

    const ulRef: RefObject<HTMLDivElement> = useRef(null);

    const onUlScroll: UIEventHandler<HTMLDivElement> = (e) => {
        if (initialOffsetTop) {
            currentConcertHandler(Math.round((e.target as HTMLElement).scrollTop) >= initialOffsetTop);
        }
    };

    const scrollTo = (offsetTop: number) => {
        ulRef.current?.scrollTo({ top: offsetTop });
    };

    return (<ConcertView ulRef={ulRef} scrollTo={scrollTo} onUlScroll={onUlScroll} setFocusOnMount={false}/>);
}

const ConcertView = ({
                         ulRef,
                         scrollTo,
                         onUlScroll,
                         setFocusOnMount,
                     }: {
    ulRef?: RefObject<HTMLDivElement>,
    scrollTo: (v: number) => void,
    onUlScroll?: UIEventHandler<HTMLDivElement>,
    setFocusOnMount: boolean,
}) => {
    const {
        cursor,
        currConcertID,
        setScrollToFunc,
        setCursorToNext,
        setCursorToPrev,
        forgoingConcerts,
        upcomingConcerts,
        areConcertsPresented,
        concertRefs,
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

    const t = useTranslations("Concerts");

    const [preventScroll, setPreventScroll] = useState(false);

    const focusOnConcert = () => {
        const currentRef = currConcertID ? concertRefs.current[currConcertID] : undefined;

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
        if (areConcertsPresented) {
            if (setFocusOnMount) {
                focusOnConcert();
            }
            setScrollToFunc(scrollTo);
        }
    }, []);

    useEffect(() => {
        focusOnConcert();
    }, [cursor]);

    return (
        <div ref={ulRef} onScroll={onUlScroll}
             className={"relative flex flex-col gap-6 mx-auto w-full min-w-64 overflow-auto scroll-smooth"}
             onKeyDown={onKeyDown}>
            {!!forgoingConcerts.length &&
                <ListItems title={t("forgoing_concerts")}
                           concerts={forgoingConcerts}
                           setPreventScroll={setPreventScroll}/>}

            {!!upcomingConcerts.length &&
                <ListItems ulClassName={"min-h-screen"}
                           addToIndex={!!forgoingConcerts.length ? forgoingConcerts.length : 0}
                           title={t("upcoming_concerts")}
                           concerts={upcomingConcerts}
                           setPreventScroll={setPreventScroll}/>}
        </div>
    );
};

const ListItems = ({ title, concerts, addToIndex, setPreventScroll, ulClassName }: {
    title: string,
    concerts: Concerts,
    addToIndex?: number,
    ulClassName?: string,
    setPreventScroll: (v: boolean) => void
}) => {
    const {
        cursor,
        concertRefs,
        setCursor,
        setConcertPath,
    } = useConcertContext() as ConcertContextType;

    //TODO: fix focus in sm, in md delete gaps between elements, fix select displaying

    const t = useTranslations("Concerts");
    const moreTitle = t("more");

    return (  <ul className={clsx({ [ulClassName!]: !!ulClassName }, "flex flex-col gap-6 mb-10")}>
            {concerts.map((concert, index) => {
                const adjustedIndex = addToIndex ? addToIndex + index : index;

                return (
                    <li key={concert.id}                             ref={element => {
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
                            onClick={() => {
                                setCursor(adjustedIndex);
                                setConcertPath();
                                setPreventScroll(true);
                            }}
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