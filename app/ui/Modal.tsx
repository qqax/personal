'use client'

import {ReactNode, useEffect, useState} from "react";
import clsx from "clsx";

export const Modal = ({show, children}: { show: boolean, children?: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;

    useEffect(() => {
        if (show) {
            setVisible(true);
            document.body.style.overflowY = "hidden";
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflowY = "auto";
            document.body.style.paddingRight = `0px`;
        }

        return () => {
            document.body.style.overflowY = "auto";
            document.body.style.paddingRight = `0px`;
        }
    }, [show]);

    return (<>
        {(show || visible) && <div
            style={{height: `${document.documentElement.scrollHeight}px`}}
            onTransitionEnd={() => !show && setVisible(false)}
            className={clsx(
                `absolute z-40 top-0 left-0 flex h-full w-full bg-black transition-all duration-500`,
                (show && visible) ? "opacity-100 bg-opacity-40" : "opacity-0 bg-opacity-0",
            )}>
            <div className={"flex w-full justify-center opacity-100"}>
                {children}
            </div>
        </div>}
    </>)
}