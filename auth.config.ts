import type { NextAuthConfig } from 'next-auth';

const authorizedRoute = "/cms"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAuthorizedRoute = nextUrl.pathname.startsWith(authorizedRoute);
            if (isOnAuthorizedRoute) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL(authorizedRoute, nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;