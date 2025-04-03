'use client';

import {Link, usePathname} from "@/i18n/routing";
import clsx from "clsx";
import {navClassName} from "@/app/ui/styles";
import {LocaleSwitcher} from "@/app/components/navbar/localeSwitcher";
import {RefObject, useEffect, useRef, useState} from "react";
import {MobileMenuButton} from "@/app/ui/Button";
import {useClickOutside} from "@/app/components/hooks";
import Modal from "@/app/ui/Modal";

export const paths = {
    about: "/",
    concerts: "/concerts",
    records: "/records",
    contacts: "/contacts",
};

const menuItems = [
    {name: 'About', href: paths.about},
    {name: 'Concerts', href: paths.concerts},
    {name: 'Records', href: paths.records},
    {name: 'Contacts', href: paths.contacts},
];

export default function Navigation() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useClickOutside([ref, buttonRef], () => {
        setOpenMobileMenu(false);
    });

    return (<div className={"md:h-full md:flex md:items-end"}>
        <Modal show={openMobileMenu} preventScroll={true}
               element={<MobileMenuButton ref={buttonRef} openMobileMenu={openMobileMenu}
                                          setOpenMobileMenu={setOpenMobileMenu}/>}>
            <MobileMenuItems ref={ref} openMobileMenu={openMobileMenu} onClick={() => setOpenMobileMenu(false)}/>
        </Modal>

        <div ref={ref} className={"hidden md:flex z-50 flex-row items-end h-full w-full transition-all duration-500"}>
            <MenuItems/>
        </div>
    </div>);
}

const MenuItems = ({onClick}: { onClick?: Function }) => {
    const pathname = usePathname();

    return (
        <>
            {
                menuItems.map(({name, href}) => {
                    const regex = new RegExp(String.raw`^${href}(/.*)?$`, "g");
                    return (<Link key={name}
                                  href={href}
                                  onClick={() => onClick && onClick(false)}
                                  className={clsx(
                                      navClassName,
                                      regex.test(pathname)
                                          ? "bg-white md:bg-opacity-20"
                                          : "md:bg-opacity-0",
                                  )}>
                            {name}
                        </Link>
                    );
                })}
            <LocaleSwitcher/>
        </>
    );
};

const MobileMenuItems = ({ref, openMobileMenu, onClick}:
                         {
                             ref: RefObject<HTMLDivElement>,
                             openMobileMenu: boolean,
                             onClick: Function
                         }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (openMobileMenu) {
            setVisible(true);
        }
    }, [openMobileMenu]);

    return (
        <div ref={ref} className={clsx(
            "relative md:hidden z-50 top-[88px] h-min items-end divide-y-[1px] divide-red-900 transition-all duration-500",
            (openMobileMenu && visible) ? "left-0" : "-left-full",
        )}>
            <MenuItems onClick={onClick}/>
        </div>
    );
};