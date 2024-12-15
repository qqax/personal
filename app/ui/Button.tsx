import clsx from "clsx";
import {Dispatch, SetStateAction} from "react";

export const WaitButton = ({disabled, className, text}: { disabled: boolean, className?: string, text: string }) => {
    return (
        <button type={"submit"} disabled={disabled}
                className={clsx(className ? className : "", "transition duration-150 py-1 disabled:text-gray-500 disabled:cursor-progress")}>
            {text}
        </button>)
}

export const MobileMenuButton = ({openMobileMenu, setOpenMobileMenu}: {
    openMobileMenu: boolean,
    setOpenMobileMenu: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <button onClick={() => setOpenMobileMenu(!openMobileMenu)}
                className={"relative z-10 flex flex-col md:hidden w-12 sm:w-20 justify-evenly pl-2 sm:pl-10 h-16"}>
            <div
                className={clsx("relative top-0 w-full border-[1px] border-white transition-all duration-500", {"rotate-[135deg] top-3": openMobileMenu})}></div>
            <div
                className={clsx("relative bottom-0 w-full border-[1px] border-white transition-all duration-500", {"rotate-[225deg] bottom-3": openMobileMenu})}></div>
        </button>
    )
}