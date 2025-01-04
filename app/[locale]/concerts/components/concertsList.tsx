'use client'

import {KeyboardEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import {ConcertsData} from "@/app/db/definitions";
import clsx from "clsx";
import {usePathname, useRouter} from "@/i18n/routing";
import {ConcertDate} from "@/app/[locale]/concerts/components/concertDate";
import {paths} from "@/app/components/navbar/navigation";
import {pathWithConcertIDHandler} from "@/app/[locale]/concerts/components/concertPathFn";
import {replaceDynamicSegmentIfExists} from "@/app/utils/pathFuncs";
import useWindowDimensions from "@/app/components/hooks";

export default function ConcertsList({concerts, firstUpcomingConcertIndex}: ConcertsData) {
    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});
    const ulRef: RefObject<HTMLUListElement> = useRef(null);
    const [cursor, setCursor] = useState(firstUpcomingConcertIndex ?? 0);
    const router = useRouter();
    const path = usePathname();

    const pushPath = (id: string) => {
        replaceDynamicSegmentIfExists(router, path, paths.concerts, id);
    }

    const {width} = useWindowDimensions();
    const isMd = width >= 768

    const focusOnConcert = (id: string) => {
        ref.current[id].focus();
        const offsetTop = ref.current[id].offsetTop;
        ulRef.current?.scrollTo({top: offsetTop});
    }

    useEffect(() => {
        window.history.scrollRestoration = 'manual';

        if (path.endsWith(paths.concerts) && concerts.length > 0) {
            const id =  !!firstUpcomingConcertIndex
                ? concerts[firstUpcomingConcertIndex].id
                : concerts[concerts.length - 1].id;
            if (isMd) {
                pushPath(id);
            } else {
                ref.current[id].focus();
                const offsetTop = ref.current[id].offsetTop;
                window.scrollTo({top: offsetTop});
            }
        }

        return () => {
            window.history.scrollRestoration = 'auto';
        }
    }, []);

    useEffect(() => {
        isMd && pathWithConcertIDHandler(path, focusOnConcert);
    }, [isMd, path]);

    const onActiveConcertChange = (index: number, id: string) => {
        setCursor(index);
        pushPath(id);
    };

    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
        if (event.key === "ArrowDown") {
            const newCursor = (cursor + 1) % concerts.length;
            onActiveConcertChange(newCursor, concerts[newCursor].id);
        } else if (event.key === "ArrowUp") {
            const newCursor = cursor === 0 ? concerts.length - 1 : cursor - 1;
            onActiveConcertChange(newCursor, concerts[newCursor].id);
        }
    };

    return (
        <ul ref={ulRef}  className={"relative mx-auto w-full min-w-64 max-w-96 overflow-auto"} onKeyDown={onKeyDown}>
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