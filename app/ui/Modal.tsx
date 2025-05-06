"use client";

import React, { type ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

const Modal = ({ show, element, children, preventScroll }: {
    show: boolean;
    element?: ReactNode;
    children?: ReactNode;
    preventScroll?: boolean;
}) => {

    const [visible, setVisible] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [domReady, setDomReady] = useState(false);

    useEffect(() => {
        setDomReady(true);
    }, []);

    useEffect(() => {
        if (show) {
            setVisible(true);

            if (preventScroll) {
                setScrollTop(document.documentElement.scrollTop);

                document.body.style.overflowY = "scroll";
                document.body.style.top = `-${document.documentElement.scrollTop}px`;
                document.body.style.inlineSize = "100%";
                document.body.style.position = `fixed`;
            }

        } else {
            if (preventScroll) {
                document.body.style.overflowY = "auto";
                document.body.style.position = `relative`;
                document.body.style.top = `0px`;
                window.scrollTo(0, scrollTop);
            }
        }
    }, [show]);

    const modalContent = (
        <>
            {element}
            {(show || visible) &&
                <div
                    onTransitionEnd={() => !show && setVisible(false)}
                    className={clsx(
                        `fixed z-[100] animate-fade top-0 left-0 flex h-full w-full backdrop-blur-md transition-all duration-500 overflow-auto`,
                        (show && visible) ? "opacity-100 bg-opacity-40" : "opacity-0 bg-opacity-0",
                    )}>
                    {children}
                </div>}
        </>
    );

    return domReady
        ? ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root") as Element | DocumentFragment,
        )
        : null;
};

export default Modal;