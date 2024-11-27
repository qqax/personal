'use client'

import {useLocale, useTranslations} from "next-intl";
import {Locale, routing, usePathname, useRouter} from "@/i18n/routing";
import {ReactNode, useRef, useState, useTransition} from "react";
import {useParams} from "next/navigation";
import clsx from "clsx";
import {useClickOutside, useScroll} from "@/app/components/hooks";

export default function Select() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    const ref = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    useClickOutside(ref, () => setOpen(false));
    useScroll(() => setOpen(false));

    const [label, setLabel] = useState(t('locale', {locale: locale}))

    const onClick = (nextLocale: Locale) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                {pathname, params},
                {locale: nextLocale}
            );
        });
        setLabel(t('locale', {locale: nextLocale}));
        setOpen(!open);
    }

    return (
        <div ref={ref}  className={"relative"}>
            <button type={"button"} className={"flex appearance-none  w-14 justify-center py-4"} disabled={isPending} onClick={() => setOpen(!open)}>{label}</button>
            <div className={clsx("absolute flex bg-gray-900 bg-opacity-50 -bottom-full w-14 justify-center py-4", {"hidden": !open})}>
                {routing.locales.reduce((acc:  ReactNode[], cur) => {
                    if (cur !== locale) {
                        acc.push(<button key={cur} disabled={isPending} type={"submit"} className={"appearance-none "}
                                         onClick={() => onClick(cur)}>{t('locale', {locale: cur})}</button>);
                    }
                    return acc;
                }, [])}
            </div>
        </div>
    )
}