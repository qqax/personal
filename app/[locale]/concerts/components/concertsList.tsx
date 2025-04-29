'use client';

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
import { useScroll } from "@/app/components/hooks";
import { type ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";
import { bgStyle } from "@/app/ui/styles";
import { useTranslations } from "next-intl";

export function SmConcertsList() {
    const {
        setScrollToFunc,
        cursor,
        currConcertID,
        areConcertsPresented,
        currentConcertHandler,
        firstUpcomingConcertID,
    } = useConcertContext() as ConcertContextType;

    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});

    const [preventScroll, setPreventScroll] = useState(false);

    const scrollWindow = (id: string) => {
        const currentOffsetTop = ref.current[id]?.offsetTop;
        const offsetTop = id === "forgoing" || !currentOffsetTop ? 0 : currentOffsetTop;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    };

    const focusOnConcert = () => {
        const currentRef = currConcertID ? ref.current[currConcertID] : undefined;

        if (!!currentRef) {
            currentRef.focus();
        }

        if (preventScroll) {
            setPreventScroll(false);
        } else if (!!currConcertID) {
            scrollWindow(currConcertID);
        }
    };

    useScroll(() => {
        const currentOffsetTop = ref.current[firstUpcomingConcertID || 0]?.offsetTop;

        if (areConcertsPresented && currentOffsetTop) {
            currentConcertHandler(
                Math.round(window.scrollY) >= currentOffsetTop - 100,
            );
        }
    });

    useEffect(() => {
        if (areConcertsPresented) {
            focusOnConcert();
            setScrollToFunc(scrollWindow);
        }
    }, []);

    useEffect(() => {
        focusOnConcert();
    }, [cursor]);

    return (<ConcertView ref={ref} setPreventScroll={(bool) => setPreventScroll(bool)}/>);
}

export function MdConcertsList() {
    const {
        cursor,
        currConcertID,
        currentConcertHandler,
        setScrollToFunc,
        firstUpcomingConcertID,
    } = useConcertContext() as ConcertContextType;

    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});
    const ulRef: RefObject<HTMLUListElement> = useRef(null);

    const [preventScroll, setPreventScroll] = useState(false);

    const onUlScroll: UIEventHandler<HTMLUListElement> = (e) => {
        const currentOffsetTop = ref.current[firstUpcomingConcertID || 0]?.offsetTop;

        if (currentOffsetTop) {
            currentConcertHandler(Math.round((e.target as HTMLElement).scrollTop) >=currentOffsetTop);
        }
    };

    const scrollUl = (id: string) => {
        const currentOffsetTop = ref.current[id]?.offsetTop;
        const offsetTop = id === "forgoing" || !currentOffsetTop ? 0 : currentOffsetTop;
        ulRef.current?.scrollTo({ top: offsetTop });
    };

    const focusOnConcert = () => {
        const currentRef = currConcertID ? ref.current[currConcertID] : undefined;

        if (!!currentRef) {
            currentRef.focus();
        }

        if (preventScroll) {
            setPreventScroll(false);
        } else if (!!currConcertID) {
            scrollUl(currConcertID);
        }
    };

    useEffect(() => {
        setScrollToFunc(scrollUl);
    }, []);

    useEffect(() => {
        focusOnConcert();
    }, [cursor]);

    return (<ConcertView ref={ref} ulRef={ulRef} onUlScroll={onUlScroll}
                         setPreventScroll={(bool) => setPreventScroll(bool)}/>);
}

const ConcertView = ({
                         ulRef,
                         onUlScroll,
                         setPreventScroll,
                         ref,
                     }: {
    ref: MutableRefObject<Record<string, HTMLButtonElement>>
    ulRef?: RefObject<HTMLUListElement>,
    onUlScroll?: UIEventHandler<HTMLUListElement>,
    setPreventScroll: (v: boolean) => void
}) => {
    const {
        cursor,
        firstUpcomingConcertIndex,
        setCursor,
        setCursorToNext,
        setCursorToPrev,
        setConcertPath,
        concerts,
    } = useConcertContext() as ConcertContextType;

    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = useCallback((event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setCursorToNext();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setCursorToPrev();
        }
    }, [setCursorToNext, setCursorToPrev]);

    const t = useTranslations("Concerts");
    const forgoingConcertsTitle = t("forgoing_concerts");
    const upcomingConcertsTitle = t("upcoming_concerts");
    const moreTitle = t("more");

    return (
        <ul ref={ulRef} onScroll={onUlScroll}
            className={"relative flex flex-col gap-6 mx-auto w-full min-w-64 max-w-96 overflow-auto scroll-smooth"}
            onKeyDown={onKeyDown}>
            {concerts?.map((concert, index) => {
                return (
                    <li key={concert.id}>
                        {index === 0 && index !== firstUpcomingConcertIndex &&
                            <p className={"text-beige text-xl p-4"}>{forgoingConcertsTitle}</p>}
                        {index === firstUpcomingConcertIndex &&
                            <p className={clsx("text-beige text-xl p-4", { "mt-8": index !== 0 })}>{upcomingConcertsTitle}</p>}
                        <button
                            id={concert.id}
                            onClick={() => {
                                setCursor(index);
                                setConcertPath();
                                setPreventScroll(true);
                            }}
                            tabIndex={index}
                            onFocus={() => setCursor(index)}
                            type={"button"}
                            ref={element => {
                                if (element) {
                                    ref.current[concert.id] = element;
                                } else {
                                    delete ref.current[concert.id];
                                }
                            }}
                            className={clsx(
                                bgStyle,
                                { "border-opacity-100   ": index === cursor },
                                "flex flex-col border-2 border-teal-900 border-opacity-0 gap-1.5 w-full text-left outline-0 p-4")}>
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