import clsx from "clsx";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { buttonStyle } from "@/app/ui/styles";

export const WaitButton = ({ disabled, className, text }: { disabled: boolean, className?: string, text: string }) => {
    return (
        <button type={"submit"} disabled={disabled}
                className={clsx({ [className!]: !!className }, buttonStyle, "transition duration-150 py-1 disabled:text-gray-500 disabled:cursor-progress")}>
            {text}
        </button>);
};

export const MobileMenuButton = ({ ref, openMobileMenu, setOpenMobileMenu }: {
    ref: RefObject<HTMLButtonElement>,
    openMobileMenu: boolean,
    setOpenMobileMenu: Dispatch<SetStateAction<boolean>>
}) => {
    const mobileMenuStyle = "relative w-full border-[1px] border-beige transition-all duration-500";

    return (
        <button ref={ref} name={"mobile-menu-button"} onClick={() => setOpenMobileMenu(!openMobileMenu)}
                className={"fixed top-4 left-4 z-[110] flex flex-col sm:hidden w-10 justify-evenly h-10"}>
            <div
                className={clsx(mobileMenuStyle, "top-0", { "rotate-[135deg] top-2": openMobileMenu })}></div>
            <div
                className={clsx(mobileMenuStyle, "bottom-0", { "rotate-[225deg] bottom-1.5": openMobileMenu })}></div>
        </button>
    );
};