import {RefObject, useEffect} from "react";

export function useClickOutside(ref: RefObject<Element> | RefObject<Element>[], onClickOutside: Function) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {

            if (Array.isArray(ref)) {
                !ref.some(ref => {
                    return ref.current && ref.current.contains(event.target as Node)
                }) && onClickOutside();
            } else {
                ref.current && !ref.current.contains(event.target as Node) && onClickOutside();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export function useScroll(onScroll: EventListenerOrEventListenerObject) {
    useEffect(function mount() {
        window.addEventListener("scroll", onScroll);

        return function unMount() {
            window.removeEventListener("scroll", onScroll);
        };
    });
}