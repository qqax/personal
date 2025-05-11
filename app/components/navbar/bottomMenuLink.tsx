import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import { navClassName } from "@/app/ui/styles";
import React from "react";

import { type MenuTitle, paths } from "@/app/components/navbar/menuTypes";
import { Link } from "@/i18n/routing";

export async function BottomMenuLink({ menuTitle }: { menuTitle: MenuTitle }) {
    const t = await getTranslations("Titles");
    const title = t(menuTitle);

    return <Link href={paths[menuTitle]} className={clsx(navClassName, "bg-opacity-60 rounded-md")}>{title}</Link>;
}

export default async function BottomMenu({ titles }: { titles: MenuTitle[] }) {
    return (<div className={"flex w-full sm:hidden justify-between gap-2 text-beige"}>
        {titles.map((title) => (
            <BottomMenuLink key={title} menuTitle={title}/>
        ))}
    </div>);
}