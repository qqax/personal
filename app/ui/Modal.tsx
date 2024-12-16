'use client'

import {ReactNode, useEffect, useState} from "react";
import clsx from "clsx";

export const Modal = ({show, children}: { show: boolean, children?: ReactNode }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        show && setVisible(true);
    }, [show]);

    return (<>
        {(show || visible) && <div style={{height: `${document.documentElement.scrollHeight}px`}}
                                   onTransitionEnd={() => !show && setVisible(false)}
                                   className={clsx(
                                       `absolute top-0 left-0 flex w-full bg-black transition-all duration-500`,
                                       (show && visible) ? "bg-opacity-40" : "bg-opacity-0",
                                       )}>
            {children}
        </div>}
    </>)
}