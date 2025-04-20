import { getTranslations } from "next-intl/server";
import Link from "next/link";
import clsx from "clsx";
import { buttonColors } from "@/app/ui/styles";
import React from "react";

import { MenuTitle, paths } from "@/app/components/navbar/menuTypes";

export async function BottomMenuLink({ menuTitle }: { menuTitle: MenuTitle }) {
    const t = await getTranslations("Titles");
    const title = t(menuTitle);

    return <Link href={paths[menuTitle]} className={clsx(buttonColors, "w-full text-center py-1")}>{title}</Link>
}

export default async function BottomMenu({ titles }: { titles: MenuTitle[] }) {
    return (<div className={"flex w-full sm:hidden mt-8 gap-4 justify-between"}>
        {titles.map((title) => (
            <BottomMenuLink key={title} menuTitle={title}/>
        ))}
    </div>)
}