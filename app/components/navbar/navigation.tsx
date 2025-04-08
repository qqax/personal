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

export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useClickOutside([ref, buttonRef], () => {
        setOpenMobileMenu(false);
    });

    return (<nav className={"fixed text-teal-950 top-0 left-0 flex flex-row w-full lg:w-1/2 z-40 sm:flex sm:items-end"}>
        <Modal show={openMobileMenu} preventScroll={true}
               element={<MobileMenuButton ref={buttonRef} openMobileMenu={openMobileMenu}
                                          setOpenMobileMenu={setOpenMobileMenu}/>}>
            <MobileMenuItems ref={ref} openMobileMenu={openMobileMenu} onClick={() => setOpenMobileMenu(false)}/>
        </Modal>

        <div ref={ref} className={"hidden sm:flex z-50 h-full w-full transition-all duration-500 backdrop-blur"}>
            <MenuItems/>
        </div>
    </nav>);
}

const MenuItems = ({onClick}: { onClick?: (param: boolean) => void }) => {
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
                                          ? "bg-amber-50 bg-opacity-20"
                                          : "bg-opacity-0",
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
            "relative flex flex-col justify-center bg-amber-50 bg-opacity-25 items-center sm:hidden z-50 transition-all duration-500 w-full h-min top-24",
            (openMobileMenu && visible) ? "left-0" : "-left-full",
        )}>
            <MenuItems onClick={onClick}/>
        </div>
    );
};