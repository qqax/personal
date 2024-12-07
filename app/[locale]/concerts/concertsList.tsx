'use client'

import {KeyboardEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import {ConcertsData} from "@/app/db/definitions";
import clsx from "clsx";

export default function ConcertsList({concerts, firstUpcomingConcertIndex}: ConcertsData) {
    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});
    const listRef: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
    const [cursor, setCursor] = useState(firstUpcomingConcertIndex ?? 0);

    const scrollToId = (index: number) => {
        const id = concerts[index].id;
        ref.current[id].focus();
        listRef.current?.scrollTo({top: ref.current[id].offsetTop, behavior: "smooth"});
    };

    useEffect(() => {
        if (firstUpcomingConcertIndex) {
            scrollToId(firstUpcomingConcertIndex);
        }
    }, []);

    const onClick = (index: number, id: string) => {
        setCursor(index);
        console.log(id);
    };

    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
        if (event.key === "ArrowDown") {
            const newCursor = (cursor + 1) % concerts.length;
            setCursor(newCursor);
            scrollToId(newCursor);
        } else if (event.key === "ArrowUp") {
            const newCursor = (cursor - 1) % concerts.length;
            setCursor(newCursor);
            scrollToId(newCursor);
        }
    };

    return (
        <ul ref={listRef} className={"relative flex flex-col overflow-auto h-96 w-72 "} onKeyDown={onKeyDown}>
            {concerts?.map((concert, index) => {
                const date = Intl.DateTimeFormat(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC"
                }).format(concert.date as Date);
                const time = Intl.DateTimeFormat(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "UTC"
                }).format(concert.date as Date);

                return (
                    <li key={concert.id}>
                        <button
                            id={concert.id}
                            onClick={() => onClick(index, concert.id)}
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
                                "flex flex-col w-full outline-0 p-2 border-[1px] border-opacity-0 border-white focus:border-green-600 focus-visible:border-[1px] focus-visible:border-green-600")}
                        >
                            <div className={"flex w-full justify-between"}>
                                <div>
                                    {date}
                                </div>
                                <div>
                                    {time}
                                </div>
                            </div>
                            <div>
                                {concert.place}
                            </div>
                            <div>
                                {concert.short_description}
                            </div>
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}