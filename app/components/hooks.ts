import {RefObject, useEffect} from "react";

export function useClickOutside(ref: RefObject<Element>, onClickOutside: Function) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export function useScroll(onScroll: Function) {
    window.onscroll = function (e) {
        onScroll(e);
    }
}