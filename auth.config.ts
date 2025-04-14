import type { NextAuthConfig } from 'next-auth';

const authorizedRoute = "/cms"

export const authConfig = {
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
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