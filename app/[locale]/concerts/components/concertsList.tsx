'use client'

import {KeyboardEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import {ConcertsData} from "@/app/db/definitions";
import clsx from "clsx";
import {usePathname, useRouter} from "@/i18n/routing";
import {ConcertDate} from "@/app/[locale]/concerts/components/concertDate";

export default function ConcertsList({concerts, firstUpcomingConcertIndex}: ConcertsData) {
    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});
    const listRef: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
    const [cursor, setCursor] = useState(firstUpcomingConcertIndex ?? 0);
    const router = useRouter();
    const path = usePathname();

    const pushPath = (id: string) => {
        router.push({pathname: path.replace(/(concerts).*$/g, '$1') + "/" + id});
    }

    const pushPathByIndex = (index: number) => {
        const id = concerts[index].id;
        pushPath(id);
    };

    useEffect(() => {
        if (path.endsWith("concerts") && firstUpcomingConcertIndex) {
            pushPathByIndex(firstUpcomingConcertIndex);
        }
    }, []);

    useEffect(() => {
        if (!path.endsWith("concerts")) {
            const segments = path.split("/");
            const id = segments[segments.length - 1];
            ref.current[id].focus();
            listRef.current?.scrollTo({top: ref.current[id].offsetTop, behavior: "smooth"});
        }
    }, [path]);

    const onClick = (index: number, id: string) => {
        setCursor(index);
        pushPath(id)
    };

    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
        if (event.key === "ArrowDown") {
            const newCursor = (cursor + 1) % concerts.length;
            setCursor(newCursor);
            pushPathByIndex(newCursor);
        } else if (event.key === "ArrowUp") {
            const newCursor = cursor === 0 ? concerts.length - 1 : cursor - 1;
            setCursor(newCursor);
            pushPathByIndex(newCursor);
        }
    };

    return (
        <ul ref={listRef} className={"relative flex flex-col overflow-auto w-72 "} onKeyDown={onKeyDown}>
            {concerts?.map((concert, index) => {
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
                            <ConcertDate dateTime={concert.date as Date} />
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