'use client';

import Link from "next/link";
import {usePathname} from 'next/navigation';
import clsx from "clsx";

const menuItems = [
    {name: 'About', href: '/'},
    {name: 'Concerts', href: '/concerts'},
    {name: 'Records', href: '/records'},
    {name: 'Contacts', href: '/contacts'},
]

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <nav className={"flex flex-row justify-around items-center z-10 border-b-red-600 border-b-4 backdrop-blur-sm bg-black bg-opacity-40"}>
            <div className={"flex"}>
                {menuItems.map(({name, href}, index) => (
                    <Link key={name}
                          href={href}
                          className={clsx(
                              "flex justify-center w-24 py-4 bg-gray-700 border-l-[1px] border-gray-500 hover:bg-opacity-40 hover:bg-gray-600 transition duration-100",
                              {
                                  "border-r-[1px]": index === menuItems.length - 1,
                                  "text-red-500 bg-gray-500 bg-opacity-40": pathname === href,
                                  "bg-opacity-20": pathname !== href,
                              },
                          )}>
                        {name}
                    </Link>
                ))}
            </div>
            <h1 className={"text-3xl flex"}>Alexander
                Kudryavtsev</h1>
        </nav>
    )
}

export default NavLinks;