import Image from "next/image";
import arrowUp from "@/public/icons/arrow-up.svg";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

export const ArrowLabel = ({ children, open, className, arrowStyle }: {
    children: ReactNode,
    open: boolean,
    className?: string,
    arrowStyle?: CSSProperties
}) => {
    return (
        <div className={clsx(className ? className : "", "flex items-center gap-2 w-full")}>
            <Image
                src={arrowUp}
                alt={"arrow"}
                width={10}
                height={10}
                style={arrowStyle}
                className={clsx("ml-2 transition duration-500", open ? "rotate-0" : "rotate-180")}
            />
            {children}
        </div>
    );
};