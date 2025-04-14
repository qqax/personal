'use client';

import {
    KeyboardEventHandler,
    MutableRefObject,
    RefObject,
    UIEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import clsx from "clsx";
import { ConcertDate } from "@/app/[locale]/concerts/components/concertDate";
import { useScroll } from "@/app/components/hooks";
import { ConcertContextType, useConcertContext } from "@/app/[locale]/concerts/concertPage";

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
        const offsetTop = id === "forgoing" ? 0 : ref.current[id].offsetTop;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    };

    const focusOnConcert = () => {
        ref.current[currConcertID].focus();
        if (preventScroll) {
            setPreventScroll(false);
        } else {
            scrollWindow(currConcertID);
        }
    };

    useScroll(() => {
        if (areConcertsPresented) {
            currentConcertHandler(
                Math.round(window.scrollY) >= ref.current[firstUpcomingConcertID || 0].offsetTop - 100,
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
        currentConcertHandler(
            Math.round((e.target as HTMLElement).scrollTop) >= ref.current[firstUpcomingConcertID || 0].offsetTop);
    };

    const scrollUl = (id: string) => {
        const offsetTop = id === "forgoing" ? 0 : ref.current[id].offsetTop;
        ulRef.current?.scrollTo({ top: offsetTop });
    };

    const focusOnConcert = () => {
        ref.current[currConcertID].focus();
        if (preventScroll) {
            setPreventScroll(false);
        } else {
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

    return (
        <ul ref={ulRef} onScroll={onUlScroll}
            className={"relative mx-auto w-full min-w-64 max-w-96 overflow-auto scroll-smooth"}
            onKeyDown={onKeyDown}>
            {concerts?.map((concert, index) => {
                return (
                    <li key={concert.id}>
                        {index === 0 && index !== firstUpcomingConcertIndex &&
                            <p className={"text-beige text-xl p-4"}>Forgoing concerts:</p>}
                        {index === firstUpcomingConcertIndex &&
                            <p className={clsx("text-beige text-xl p-4", { "mt-8": index !== 0 })}>Upcoming
                                concerts:</p>}
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
                                { "bg-opacity-40": index % 2 },
                                { "bg-opacity-75": index === cursor },
                                "flex flex-col gap-1.5 w-full text-left outline-0 p-4 bg-amber-50 ")}
                        >
                            <ConcertDate dateTime={concert.date as Date}/>
                            <p>
                                {concert.place}
                            </p>
                            <p>
                                {concert.short_description}
                            </p>
                            <span className={"text-beige ml-auto md:hidden"}>More...</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};