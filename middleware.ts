import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

export default createMiddleware(routing);

export { auth as middleware } from "@/auth";

export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/', '/(ru|en)/:path*',
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|auth|.*\\..*).*)",
    ]
};