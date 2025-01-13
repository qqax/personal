'use client'

import {KeyboardEventHandler, MutableRefObject, RefObject, UIEventHandler, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {ConcertDate} from "@/app/[locale]/concerts/components/concertDate";
import {useScroll} from "@/app/components/hooks";
import {ConcertContextType, useConcertContext} from "@/app/[locale]/concerts/concertPage";

export function SmConcertsList() {
    const {cursor, currConcertID, areConcertsPresented, currentConcertHandler} = useConcertContext() as ConcertContextType;

    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});

    const [preventScroll, setPreventScroll] = useState(false);

    const scrollWindow = (id: string) => {
        const offsetTop = ref.current[id].offsetTop;
        window.scrollTo({top: offsetTop});
    }

    const setNewActiveConcert = () => {
        ref.current[currConcertID].focus();

        preventScroll ? setPreventScroll(false) : scrollWindow(currConcertID);
    }

    const initialConcertID = useRef(currConcertID);

    useScroll(() => {
        if (areConcertsPresented) {
            currentConcertHandler(
                Math.round(window.scrollY) >= ref.current[initialConcertID.current].offsetTop
            );
        }
    })

    useEffect(() => {
        if (areConcertsPresented) {
            setNewActiveConcert();
        }
    }, []);

    useEffect(() => {
        setNewActiveConcert();
    }, [cursor]);

    return (<ConcertView ref={ref} setPreventScroll={(bool) => setPreventScroll(bool)}/>)
}

export function MdConcertsList() {
    const {cursor, currConcertID, currentConcertHandler} = useConcertContext() as ConcertContextType;

    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});
    const ulRef: RefObject<HTMLUListElement> = useRef(null);

    const [preventScroll, setPreventScroll] = useState(false);

    const initialConcertID = useRef(currConcertID);

    const onUlScroll: UIEventHandler<HTMLUListElement> = (e) => {
        currentConcertHandler(
            Math.round((e.target as HTMLElement).scrollTop) >= ref.current[initialConcertID.current].offsetTop);
    }

    const scrollUl = (id: string) => {
        const offsetTop = ref.current[id].offsetTop;
        ulRef.current?.scrollTo({top: offsetTop});
    }

    useEffect(() => {
        ref.current[currConcertID].focus();
        preventScroll ? setPreventScroll(false) : scrollUl(currConcertID);
    }, [cursor]);

    return (<ConcertView ref={ref} ulRef={ulRef} onUlScroll={onUlScroll}
                         setPreventScroll={(bool) => setPreventScroll(bool)}/>)
}

const ConcertView = ({
                         ulRef,
                         onUlScroll,
                         setPreventScroll,
                         ref
                     }: {
    ref: MutableRefObject<Record<string, HTMLButtonElement>>
    ulRef?: RefObject<HTMLUListElement>,
    onUlScroll?: UIEventHandler<HTMLUListElement>,
    setPreventScroll: (v: boolean) => void
}) => {
    const {setCursor, setCursorToNext, setCursorToPrev, setConcertPath, concerts} = useConcertContext() as ConcertContextType;

    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
        if (event.key === "ArrowDown") {
            setCursorToNext();
        } else if (event.key === "ArrowUp") {
            setCursorToPrev();
        }
    };

    return (
        <ul ref={ulRef} onScroll={onUlScroll}
            className={"relative scroll-smooth mx-auto w-full min-w-64 max-w-96 overflow-auto"}
            onKeyDown={onKeyDown}>
            {concerts?.map((concert, index) => {
                return (
                    <li key={concert.id}>
                        <button
                            id={concert.id}
                            onClick={() => {
                                setCursor(index);
                                setConcertPath();
                                setPreventScroll(true);
                            }}
                            type={"button"}
                            ref={element => {
                                if (element) {
                                    ref.current[concert.id] = element
                                } else {
                                    delete ref.current[concert.id]
                                }
                            }}
                            className={clsx(
                                {"bg-green-950 bg-opacity-40": index % 2},
                                "flex flex-col gap-1.5 w-full text-left outline-0 p-4 border-[1px] border-opacity-0 border-white focus:border-green-600 focus-visible:border-[1px] focus-visible:border-green-600")}
                        >
                            <ConcertDate dateTime={concert.date as Date}/>
                            <p>
                                {concert.place}
                            </p>
                            <p>
                                {concert.short_description}
                            </p>
                            <span className={"text-green-400 ml-auto md:hidden"}>More...</span>
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}