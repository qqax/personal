'use client';

import {RefObject, useEffect, useState} from "react";

export function useClickOutside(ref: RefObject<Element> | RefObject<Element>[], onClickOutside: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {

            if (Array.isArray(ref)) {
                if (!ref.some(ref => ref.current && ref.current.contains(event.target as Node))) {
                    onClickOutside();
                }
            } else {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    onClickOutside();
                }
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

type WindowDimensionType = { width: number, height: number };

function getWindowDimensions(): WindowDimensionType {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height,
    };
}

export function useMd() {
    const {width} = useWindowDimensions();
    const [isMd, setIsMd] = useState(width >= 768);

    useEffect(() => {
        setIsMd(width >= 768);
    }, [width]);

    return isMd;
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        setWindowDimensions(getWindowDimensions());

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}