'use client'

import {useLocale, useTranslations} from "next-intl";
import {Locale, routing, usePathname, useRouter} from "@/i18n/routing";
import {ReactNode, useState, useTransition} from "react";
import {useParams} from "next/navigation";
import {Select} from "@/app/ui/Select";
import clsx from "clsx";
import {navClassName} from "@/app/ui/styles";

type Options = {value: string, label: ReactNode}[];

export const LocaleSwitcher = () => {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    const [label, setLabel] = useState(t('locale', {locale: locale}))
    const [open, setOpen] = useState(false);

    const options = routing.locales.reduce((acc: Options, cur) => {
        if (cur !== locale) {
            acc.push({value: cur, label: t('locale', {locale: cur})});
        }
        return acc;
    }, []);

    const onClick = (nextLocale: Locale) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                {pathname, params},
                {locale: nextLocale}
            );

            setLabel(t('locale', {locale: nextLocale}));
            setOpen(false);
        });
    }
    return (<Select className={clsx("md:bg-opacity-0 appearance-none", navClassName)} open={open} setOpen={setOpen} selectedLabel={label} isPending={isPending}>
            {options.map(({value, label}) => {
                return (<button key={value} disabled={isPending} type={"submit"} className={clsx("appearance-none md:bg-black md:bg-opacity-60", navClassName)}
                                onClick={() => onClick(value as Locale)}>{label}</button>)
            })}
        </Select>
    )
}