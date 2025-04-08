import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const Locales = ["en", "ru"];
const defaultLocale = Locales[0];
export const NotDefaultLocales: string[] = Locales.filter(l => l !== defaultLocale);

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: Locales,

    // Used when no locale matches
    defaultLocale: defaultLocale,

    localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);
