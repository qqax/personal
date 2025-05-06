"use client";

import { type RefObject, useEffect, useState } from "react";

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
    return {
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
            height: typeof window !== 'undefined' ? window.innerHeight : 0,
    };
}

function useBreakpoint(breakpoint :number) {
    const { width } = useWindowDimensions();
    const [isGreater, setIsGreater] = useState(width >= breakpoint);

    useEffect(() => {
        setIsGreater(width >= breakpoint);
    }, [breakpoint, width]);

    return isGreater;
}

export function useMd() {
    return useBreakpoint(768);
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowDimensions;
}