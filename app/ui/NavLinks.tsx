'use client';

import Link from "next/link";
import {usePathname} from 'next/navigation';
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";

const menuItems = [
    {name: 'About', href: '/'},
    {name: 'Concerts', href: '/concerts'},
    {name: 'Records', href: '/records'},
    {name: 'Contacts', href: '/contacts'},
]

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <nav className={clsx("flex flex-row justify-around items-center z-10 border-b-red-600 border-b-4", bgStyle)}>
            <div className={"flex"}>
                {menuItems.map(({name, href}, index) => (
                    <Link key={name}
                          href={href}
                          className={clsx(
                              "flex justify-center w-24 py-4 border-l-[1px] border-gray-500 hover:bg-opacity-20 hover:bg-gray-500 transition duration-100",
                              {
                                  "border-r-[1px]": index === menuItems.length - 1,
                                  "text-red-200 bg-gray-500 bg-opacity-40": pathname === href,
                                  "bg-opacity-20": pathname !== href,
                              },
                          )}>
                        {name}
                    </Link>
                ))}
            </div>
            <h1 className={"text-3xl flex text-beige"}>Alexander
                Kudryavtsev</h1>
        </nav>
    )
}

export default NavLinks;