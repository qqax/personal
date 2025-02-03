import {ReactNode, useRef} from "react";
import clsx from "clsx";
import {useClickOutside, useScroll} from "@/app/components/hooks";

export const Select = ({children, selectedLabel, setOpen, open, isPending, className}: {
    children: ReactNode[];
    selectedLabel: ReactNode,
    setOpen: Function,
    open: boolean,
    isPending?: boolean,
    className?: string
}) => {
    const ref = useRef<HTMLInputElement>(null);

    useClickOutside(ref, () => setOpen(false));
    useScroll(() => setOpen(false));

    return (
        <div ref={ref} className={"relative"}>
            <button type={"button"} className={className} disabled={isPending}
                    onClick={() => setOpen(!open)}>{selectedLabel}</button>
            <div
                className={clsx("absolute -bottom-full", {"hidden": !open})}>
                {children}
            </div>
        </div>
    );
};

