'use client'

import {Link, usePathname} from "@/i18n/routing";
import clsx from "clsx";

const menuItems = [
    {name: 'About', href: '/'},
    {name: 'Concerts', href: '/concerts'},
    {name: 'Records', href: '/records'},
    {name: 'Contacts', href: '/contacts'},
]

export default function Navigation() {
    const pathname = usePathname();

    return (<>
        {
            menuItems.map(({name, href}, index) => (
                <Link key={name}
                      href={href}
                      className={clsx(
                          "flex justify-center w-24 py-4 border-l-[1px] border-gray-500 hover:bg-opacity-20 hover:bg-gray-500 transition duration-100",
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