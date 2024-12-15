'use client'

import {Link, usePathname} from "@/i18n/routing";
import clsx from "clsx";
import {navClassName} from "@/app/ui/styles";
import {LocaleSwitcher} from "@/app/components/navbar/localeSwitcher";
import {useRef, useState} from "react";
import {MobileMenuButton} from "@/app/ui/Button";
import {useClickOutside} from "@/app/components/hooks";
import {Modal} from "@/app/ui/Modal";

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
]

export default function Navigation() {
    const pathname = usePathname();
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    useClickOutside(ref, () => {setOpenMobileMenu(false)});

    return (<div className={"flex items-center"}>
        <MobileMenuButton ref={ref} openMobileMenu={openMobileMenu} setOpenMobileMenu={setOpenMobileMenu}/>
        <Modal show={openMobileMenu}/>
        <div className={clsx(
            "flex absolute transition-all divide-y-[1px] divide-red-900 md:divide-y-0 duration-500 top-[88px] md:static flex-col md:flex-row items-end h-full",
            openMobileMenu ? "left-0" : "-left-full"
        )}>
            {
                menuItems.map(({name, href}) => {
                    const regex = new RegExp(String.raw`^${href}(/.*)?$`, "g");
                    return (<Link key={name}
                                  href={href}
                                  className={clsx(
                                      navClassName,
                                      regex.test(pathname)
                                          ? "bg-red-950 md:bg-white md:bg-opacity-20"
                                          : "md:bg-opacity-0",
                                  )}>
                            {name}
                        </Link>
                    )
                })}
            <LocaleSwitcher/>
        </div>
    </div>)
}