'use client'

import {Link, usePathname} from "@/i18n/routing";
import clsx from "clsx";

const menuItems = [
    {name: 'About', href: '/'},
    {name: 'Concerts', href: '/concerts'},
    {name: 'Records', href: '/records'},
    {name: 'Contacts', href: '/contacts'},
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