"use client";

import { Link, usePathname } from "@/i18n/routing";
import clsx from "clsx";
import { navClassName } from "@/app/ui/styles";
import { LocaleSwitcher } from "@/app/components/navbar/localeSwitcher";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { MobileMenuButton } from "@/app/ui/Button";
import { useClickOutside } from "@/app/components/hooks";
import Modal from "@/app/ui/Modal";
import { useTranslations } from "next-intl";
import { type homeMenuLayoutPath, homeMenuLayoutPaths, menuItems } from "@/app/components/navbar/menuTypes";

export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useClickOutside([ref, buttonRef], () => {
        setOpenMobileMenu(false);
    });

    const pathName = usePathname();

    const isHomeLayout = useMemo(() => {
        return homeMenuLayoutPaths.includes(pathName as homeMenuLayoutPath);
    }, [pathName]);

    return (<nav
        className={clsx( { "lg:backdrop-blur-none lg:shadow-none lg:bg-none lg:bg-opacity-0":  isHomeLayout }, "backdrop-blur shadow-xl bg-amber-50 bg-opacity-25 fixed h-[72px] transition duration-300 top-0 left-0 flex flex-row w-full z-40 sm:flex sm:items-end")}>
        <Modal show={openMobileMenu} preventScroll={true}
               element={<MobileMenuButton ref={buttonRef} openMobileMenu={openMobileMenu}
                                          setOpenMobileMenu={setOpenMobileMenu}/>}>
            <MobileMenuItems ref={ref} openMobileMenu={openMobileMenu} onClick={() => setOpenMobileMenu(false)}/>
        </Modal>

        <div ref={ref}
             className={"hidden sm:flex z-50 h-full w-full lg:w-1/2 transition-all duration-300"}>
            <MenuItems/>
        </div>
    </nav>);
}

const MenuItems = ({ onClick }: { onClick?: (param: boolean) => void }) => {
    const pathname = usePathname();
    const t = useTranslations("Titles");

    return (
        <>
            {
                menuItems.map(({ name, href }) => {
                    const regex = new RegExp(String.raw`^${href}(/.*)?$`, "g");
                    const translatedName = t(name);
                    return (<Link key={name}
                                  href={href}
                                  onClick={() => onClick && onClick(false)}
                                  className={clsx(
                                      navClassName,
                                      regex.test(pathname)
                                          ? "bg-opacity-40 shadow-xl"
                                          : "bg-opacity-0",
                                  )}>
                            {translatedName}
                        </Link>
                    );
                })}
            <LocaleSwitcher/>
        </>
    );
};

const MobileMenuItems = ({ ref, openMobileMenu, onClick }:
                         {
                             ref: RefObject<HTMLDivElement>,
                             openMobileMenu: boolean,
                             onClick: (param: boolean) => void,
                         }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (openMobileMenu) {
            setVisible(true);
        }
    }, [openMobileMenu]);

    return (
        <div ref={ref} className={clsx(
            "relative flex flex-col justify-center bg-amber-50 bg-opacity-50 items-center sm:hidden z-50 transition-all duration-300 w-full h-min top-24",
            (openMobileMenu && visible) ? "left-0" : "-left-full",
        )}>
            <MenuItems onClick={onClick}/>
        </div>
    );
};