import { type ReactNode, useRef } from "react";
import clsx from "clsx";
import { buttonStyle } from "@/app/ui/styles";
import { ArrowLabel } from "@/app/ui/Label.tsx";

export const ExpandableDiv = ({ children, open, setOpen, title }: {
    children: ReactNode;
    open: boolean,
    setOpen: (v: boolean) => void,
    title: ReactNode,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (<div className={"w-full flex flex-col"}>
        <button className={clsx(buttonStyle, "p-1 flex items-center gap-4")} onClick={() => setOpen(!open)}>
            <ArrowLabel open={open}>{title}</ArrowLabel>
        </button>
        <div
            ref={contentRef}
            style={{
                maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
            }}
            className={clsx(open ? "opacity-100" : "opacity-0",
                "w-full flex justify-between transition-all duration-500 ease-in-out overflow-hidden")}>
            {children}
        </div>
    </div>);
};

