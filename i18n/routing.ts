import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { defaultLocale, localeValues } from "@/app/lib/schema/enums.ts";

export const routing = defineRouting({
    locales: localeValues,
    defaultLocale: defaultLocale,
    localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
