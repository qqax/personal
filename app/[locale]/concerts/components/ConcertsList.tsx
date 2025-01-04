'use client'

import {KeyboardEventHandler, MutableRefObject, RefObject, UIEventHandler, useEffect, useRef, useState} from "react";
import {Concerts, ConcertsData} from "@/app/db/definitions";
import clsx from "clsx";
import {usePathname, useRouter} from "@/i18n/routing";
import {ConcertDate} from "@/app/[locale]/concerts/components/concertDate";
import {paths} from "@/app/components/navbar/navigation";
import {pathWithConcertIDHandler} from "@/app/[locale]/concerts/components/concertPathFn";
import {replaceDynamicSegmentIfExists} from "@/app/utils/pathFuncs";
import {useScroll} from "@/app/components/hooks";

const onKeyDownHandler = (cursor: number, len: number, onActiveConcertChange: (number: number) => void): KeyboardEventHandler<HTMLUListElement> =>
    (event) => {
        if (event.key === "ArrowDown") {
            const newCursor = (cursor + 1) % len;
            onActiveConcertChange(newCursor);
        } else if (event.key === "ArrowUp") {
            const newCursor = cursor === 0 ? len - 1 : cursor - 1;
            onActiveConcertChange(newCursor);
        }
    };

export function SmConcertsList({
                                   concerts,
                                   firstUpcomingConcertIndex,
                                   setIsCurrentUpcoming,
                                   isUpcomingConcertPresented
                               }: ConcertsData & {
    isUpcomingConcertPresented: boolean,
    setIsCurrentUpcoming: Function
}) {
    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});

    const [cursor, setCursor] = useState(isUpcomingConcertPresented ? firstUpcomingConcertIndex : 0);

    const initialConcertID = isUpcomingConcertPresented
        ? concerts[firstUpcomingConcertIndex].id
        : concerts[concerts.length - 1].id;

    const setNewActiveConcert = (id: string) => {
        ref.current[id].focus();
        const offsetTop = ref.current[id].offsetTop;
        window.scrollTo({top: offsetTop});
    }

    useScroll(() => {
        setIsCurrentUpcoming(Math.round(window.scrollY) >= ref.current[initialConcertID].offsetTop);
    })

    useEffect(() => {
        if (concerts.length > 0) {
            setNewActiveConcert(initialConcertID)
        }
    }, []);

    const onActiveConcertChange = (index: number, id: string) => {
        setCursor(index);
        setNewActiveConcert(id);
    };

    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = onKeyDownHandler(cursor, concerts.length, (newCursor) => onActiveConcertChange(newCursor, concerts[newCursor].id));

    return (<ConcertView ref={ref} concerts={concerts}
                         onActiveConcertChange={onActiveConcertChange} onKeyDown={onKeyDown}/>)
}

export function ConcertsList({
                                 concerts,
                                 firstUpcomingConcertIndex,
                                 setIsCurrentUpcoming,
                                 isUpcomingConcertPresented
                             }: ConcertsData & {
    isUpcomingConcertPresented: boolean,
    setIsCurrentUpcoming: Function
}) {
    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});
    const ulRef: RefObject<HTMLUListElement> = useRef(null);

    const [cursor, setCursor] = useState(isUpcomingConcertPresented ? firstUpcomingConcertIndex : 0);

    const router = useRouter();
    const path = usePathname();

    const initialConcertID = isUpcomingConcertPresented
        ? concerts[firstUpcomingConcertIndex].id
        : concerts[concerts.length - 1].id;

    const pushPath = (id: string) => {
        replaceDynamicSegmentIfExists(router, path, paths.concerts, id);
    }

    const onUlScroll: UIEventHandler<HTMLUListElement> = (e) => {
        setIsCurrentUpcoming(Math.round((e.target as HTMLElement).scrollTop) >= ref.current[initialConcertID].offsetTop);
    }

    const focusOnConcert = (id: string) => {
        ref.current[id].focus();
        const offsetTop = ref.current[id].offsetTop;
        ulRef.current?.scrollTo({top: offsetTop});
    }

    useEffect(() => {
        if (path.endsWith(paths.concerts) && concerts.length > 0) {
            pushPath(initialConcertID);
        }
    }, []);

    useEffect(() => {
        pathWithConcertIDHandler(path, focusOnConcert);
    }, [path]);

    const onActiveConcertChange = (index: number, id: string) => {
        setCursor(index);
        pushPath(id);
    };

    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = onKeyDownHandler(cursor, concerts.length, (newCursor) => onActiveConcertChange(newCursor, concerts[newCursor].id));

    return (<ConcertView ref={ref} ulRef={ulRef} concerts={concerts} onUlScroll={onUlScroll}
                         onActiveConcertChange={onActiveConcertChange} onKeyDown={onKeyDown}/>)
}

const ConcertView = ({
                         ulRef,
                         onUlScroll,
                         onKeyDown,
                         concerts,
                         onActiveConcertChange,
                         ref
                     }: {
    ref: MutableRefObject<Record<string, HTMLButtonElement>>
    ulRef?: RefObject<HTMLUListElement>,
    onUlScroll?: UIEventHandler<HTMLUListElement>,
    onKeyDown: KeyboardEventHandler<HTMLUListElement>,
    concerts: Concerts,
    onActiveConcertChange: (index: number, id: string,) => void,
}) => {
    return (
        <ul ref={ulRef} onScroll={onUlScroll} className={"relative mx-auto w-full min-w-64 max-w-96 overflow-auto"}
            onKeyDown={onKeyDown}>
            {concerts?.map((concert, index) => {
                return (
                    <li key={concert.id}>
                        <button
                            id={concert.id}
                            onClick={() => onActiveConcertChange(index, concert.id)}
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