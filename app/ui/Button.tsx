import clsx from "clsx";
import { Dispatch, RefObject, SetStateAction } from "react";
import { buttonColors } from "@/app/ui/styles";

export const WaitButton = ({ disabled, className, text }: { disabled: boolean, className?: string, text: string }) => {
    return (
        <button type={"submit"} disabled={disabled}
                className={clsx(className ? className : "", buttonColors, "transition duration-150 py-1 disabled:text-gray-500 disabled:cursor-progress")}>
            {text}
        </button>);
};

export const MobileMenuButton = ({ ref, openMobileMenu, setOpenMobileMenu }: {
    ref: RefObject<HTMLButtonElement>,
    openMobileMenu: boolean,
    setOpenMobileMenu: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <button ref={ref} onClick={() => setOpenMobileMenu(!openMobileMenu)}
                className={"fixed top-5 left-4 z-50 flex flex-col sm:hidden w-10 justify-evenly h-10"}>
            <div
                className={clsx("relative top-0 w-full border-[1px] border-orange-900 transition-all duration-500", { "rotate-[135deg] top-2": openMobileMenu })}></div>
            <div
                className={clsx("relative bottom-0 w-full border-[1px] border-orange-900 transition-all duration-500", { "rotate-[225deg] bottom-1.5": openMobileMenu })}></div>
        </button>
    );
};