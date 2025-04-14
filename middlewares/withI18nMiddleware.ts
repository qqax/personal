import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export function withI18nMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const handleI18nRouting = createMiddleware(routing);
        response = handleI18nRouting(request);

        return middleware(request, event, response);
    };
}