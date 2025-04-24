import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const Locales = ["en", "ru"];
const defaultLocale = Locales[0];
export const NotDefaultLocales: string[] = Locales.filter(l => l !== defaultLocale);

export const routing = defineRouting({
    locales: Locales,
    defaultLocale: defaultLocale,
    localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
