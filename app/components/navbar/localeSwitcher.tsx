'use client';

import { useLocale, useTranslations } from "next-intl";
import { Link, routing, usePathname } from "@/i18n/routing";
import { type ReactNode, useMemo, useState, useTransition } from "react";
import { Select } from "@/app/ui/Select";
import clsx from "clsx";
import { navClassName } from "@/app/ui/styles";

type Options = { value: string, label: ReactNode }[];

export const LocaleSwitcher = () => {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const [isPending] = useTransition();
    const pathname = usePathname();

    const [label] = useState(t('locale', { locale: locale }));
    const [open, setOpen] = useState(false);

    const options = useMemo(() => routing.locales.reduce((acc: Options, currentLocale) => {
        if (currentLocale !== locale) {
            acc.push({ value: currentLocale, label: t('locale', { locale: currentLocale }) });
        }
        return acc;
    }, []), [locale, t]);

    return (<Select className={clsx("appearance-none bg-opacity-0", navClassName)} open={open} setOpen={setOpen}
                    selectedLabel={label} isPending={isPending}>
            {options.map(({ value, label }) => {
                return (<Link key={value}
                              href={{ pathname: pathname }}
                              locale={value}
                              className={clsx("flex items-center justify-center w-full bg-opacity-50 lg:bg-opacity-0", navClassName)}>{label}</Link>);
            })}
        </Select>
    );
};