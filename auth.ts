import NextAuth from 'next-auth';
import {DrizzleAdapter} from "@auth/drizzle-adapter"
import {authConfig} from './auth.config';
import {randomBytes, randomUUID} from "node:crypto";
import {db} from "@/app/lib/connection";
import Nodemailer from "@auth/core/providers/nodemailer";

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db),
    providers: [
        Nodemailer({
            server: process.env.SMTP_SERVER_HOST,
            from: process.env.SMTP_SERVER_USERNAME,
        }),
    ],
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    }
});