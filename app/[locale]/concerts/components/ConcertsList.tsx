'use client'

import {KeyboardEventHandler, MutableRefObject, RefObject, UIEventHandler, useEffect, useRef, useState} from "react";
import {Concerts} from "@/app/db/definitions";
import clsx from "clsx";
import {usePathname, useRouter} from "@/i18n/routing";
import {ConcertDate} from "@/app/[locale]/concerts/components/concertDate";
import {paths} from "@/app/components/navbar/navigation";
import {replaceDynamicSegmentIfExists} from "@/app/utils/pathFuncs";
import {useScroll} from "@/app/components/hooks";
import {ConcertContextType, useConcertContext} from "@/app/[locale]/concerts/concertPage";

export function SmConcertsList({
                                   concerts,
                                   setIsCurrentUpcoming
                               }: {
    concerts: Concerts,
    setIsCurrentUpcoming: Function
}) {
    const {cursor} = useConcertContext() as ConcertContextType;

    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});

    const [preventScroll, setPreventScroll] = useState(false);

    const scrollWindow = (id: string) => {
        const offsetTop = ref.current[id].offsetTop;
        window.scrollTo({top: offsetTop});
    }

    const setNewActiveConcert = (cursor: number) => {
        const {id} = concerts[cursor];

        ref.current[id].focus();

        preventScroll ? setPreventScroll(false) : scrollWindow(id);
    }

    const initialConcertID = useRef(concerts[cursor].id);

    useScroll(() => {
        if (concerts.length > 0) {
            setIsCurrentUpcoming(
                Math.round(window.scrollY) >= ref.current[initialConcertID.current].offsetTop
            );
        }
    })

    useEffect(() => {
        if (concerts.length > 0) {
            setNewActiveConcert(cursor);
        }
    }, []);

    useEffect(() => {
        setNewActiveConcert(cursor);
    }, [cursor]);

    return (<ConcertView ref={ref} concerts={concerts} setPreventScroll={(bool) => setPreventScroll(bool)}/>)
}

export function MdConcertsList({
                                   concerts,
                                   setIsCurrentUpcoming,
                               }: {
    concerts: Concerts,
    setIsCurrentUpcoming: Function
}) {
    const {cursor} = useConcertContext() as ConcertContextType;

    const ref: MutableRefObject<Record<string, HTMLButtonElement>> = useRef({});
    const ulRef: RefObject<HTMLUListElement> = useRef(null);

    const router = useRouter();
    const path = usePathname();

    const [preventScroll, setPreventScroll] = useState(false);

    const initialConcertID = useRef(concerts[cursor].id);

    const onUlScroll: UIEventHandler<HTMLUListElement> = (e) => {
        setIsCurrentUpcoming(
            Math.round((e.target as HTMLElement).scrollTop) >= ref.current[initialConcertID.current].offsetTop);
    }

    const scrollUl = (id: string) => {
        const offsetTop = ref.current[id].offsetTop;
        ulRef.current?.scrollTo({top: offsetTop});
    }

    useEffect(() => {
        if (path.endsWith(paths.concerts) && concerts.length > 0) {
            const {id} = concerts[cursor];
            replaceDynamicSegmentIfExists(router, path, paths.concerts, id);
        }
    }, []);

    // useEffect(() => {
    //     if (!path.endsWith(paths.concerts)) {
    //         const id = getLastSegment(path);
    //         ref.current[id].focus();
    //
    //         preventScroll ? setPreventScroll(false) : scrollUl(id);
    //     }
    // }, [path]);

    useEffect(() => {
        const {id} = concerts[cursor];
        replaceDynamicSegmentIfExists(router, path, paths.concerts, id);

        // if (!path.endsWith(paths.concerts)) {
        //     const id = getLastSegment(path);
        ref.current[id].focus();

        preventScroll ? setPreventScroll(false) : scrollUl(id);
        // }
    }, [cursor]);

    return (<ConcertView ref={ref} ulRef={ulRef} concerts={concerts} onUlScroll={onUlScroll}
                         setPreventScroll={(bool) => setPreventScroll(bool)}/>)
}

const ConcertView = ({
                         ulRef,
                         onUlScroll,
                         concerts,
                         setPreventScroll,
                         ref
                     }: {
    ref: MutableRefObject<Record<string, HTMLButtonElement>>
    ulRef?: RefObject<HTMLUListElement>,
    onUlScroll?: UIEventHandler<HTMLUListElement>,
    concerts: Concerts,
    setPreventScroll: (v: boolean) => void
}) => {
    const {cursor, setCursor} = useConcertContext() as ConcertContextType;


    const onKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
        const {length} = concerts;
        if (event.key === "ArrowDown") {
            const newCursor = (cursor + 1) % length;
            setCursor(newCursor);
        } else if (event.key === "ArrowUp") {
            const newCursor = cursor === 0 ? length - 1 : cursor - 1;
            setCursor(newCursor);
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