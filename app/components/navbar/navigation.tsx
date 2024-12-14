'use client'

import {Link, usePathname} from "@/i18n/routing";
import clsx from "clsx";

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

export default function Navigation({className}: { className: string }) {
    const pathname = usePathname();

    return (<>
        {
            menuItems.map(({name, href}) => {
                const regex = new RegExp(String.raw`^${href}(/.*)?$`, "g");
                return (<Link key={name}
                              href={href}
                              className={clsx(
                                  className,
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