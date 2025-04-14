import { chain } from '@/middlewares/chain';
import { withI18nMiddleware } from '@/middlewares/withI18nMiddleware';

export default chain([withI18nMiddleware]);

export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/', '/(ru|en)/:path*',
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ]
};