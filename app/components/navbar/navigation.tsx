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
            menuItems.map(({name, href}, index) => (
                <Link key={name}
                      href={href}
                      className={clsx(
                          className,
                          "border-l-[1px]",
                          {
                              "border-r-[1px]": index === menuItems.length - 1,
                              "text-red-600 bg-gray-600 bg-opacity-40": pathname === href,
                              "bg-opacity-20": pathname !== href,
                          },
                      )}>
                    {name}
                </Link>
            ))}
    </>)
}