'use client'

import {Link, usePathname} from "@/i18n/routing";
import clsx from "clsx";
import {navClassName} from "@/app/ui/styles";

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

    return (<>
        {
            menuItems.map(({name, href}) => {
                const regex = new RegExp(String.raw`^${href}(/.*)?$`, "g");
                return (<Link key={name}
                              href={href}
                              className={clsx(
                                  navClassName,
                                  "w-24",
                                  regex.test(pathname)
                                      ? "bg-white bg-opacity-10"
                                      : "bg-opacity-80",
                              )}>
                        {name}
                    </Link>
                )
            })}
    </>)
}