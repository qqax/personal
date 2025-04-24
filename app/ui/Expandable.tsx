import { ReactNode, useRef } from "react";
import clsx from "clsx";
import { buttonColors } from "@/app/ui/styles";
import Image from "next/image";
import arrowUp from "@/public/icons/arrow-up.svg";

export const ExpandableDiv = ({ children, open, setOpen, title }: {
    children: ReactNode;
    open: boolean,
    setOpen: (v: boolean) => void,
    title: string
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (<div className={"w-full flex flex-col"}>
        <button className={clsx(buttonColors, "p-1 flex gap-4")} onClick={() => setOpen(!open)}>
            <Image
                src={arrowUp}
                alt={"arrow"}
                width={10}
                height={10}
                className={clsx("ml-2 transition duration-500", open ? "rotate-0" : "rotate-180")}
            />
            {title}
        </button>
        <div
            ref={contentRef}
            style={{
                maxHeight: open ? `${contentRef.current?.scrollHeight}px` : '0px',
            }}
            className={clsx(open ? "opacity-100" : "opacity-0",
                "w-full flex justify-between transition-all duration-500 ease-in-out overflow-hidden")}>
            {children}
        </div>
    </div>)
}