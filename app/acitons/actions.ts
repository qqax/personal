'use server';

import {z} from 'zod';
import {sendMail} from "@/app/acitons/sendMail";
import verifyReCaptcha from "@/app/acitons/reCaptcha";
import {insertEmail} from "@/app/lib/data";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";

const tokenValidation = z.string().min(10, {message: 'Unexpected error occurred.'});
const mailValidation = z.string().email({message: 'Please Enter a Valid Email Address'});

const ContactMailSchema = z.object({
    name: z.string().min(2, {message: 'Please Enter Your Name'}),
    email: mailValidation,
    message: z
        .string()
        .min(10, {message: 'Please make sure your message is at least 10 characters long.'}),
    token: tokenValidation,
});

const MailoutSchema = z.object({
    email: mailValidation,
    token: tokenValidation,
});

export type StatusState = {
    status?: "rejected" | "error" | "success" | "ReCaptcha error" | null;
    errors?: Record<string, unknown>;
};

export type ContactMailState = StatusState & {
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export type MailOutState = StatusState & {
    errors?: {
        email?: string[];
    };
};

export async function addMailoutEmail(prevState: MailOutState | undefined, formData: FormData) {
    const state: MailOutState = {};

    const token = formData.get('token') as string;

    if (!token) {
        state.status = 'ReCaptcha error';
        return state;
    }

    const reCaptchaResponse = await verifyReCaptcha(token);

    if (!reCaptchaResponse.success) {
        state.status = 'ReCaptcha error';
        return state;
    }

    const MakeContact = MailoutSchema.omit({token: true});

    const validatedFields = MakeContact.safeParse({
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors;
        state.status = 'rejected';

        return state;
    }

    const {email} = validatedFields.data;

    const result = await insertEmail(email);

    if (result) {
        state.status = "success";
    } else {
        state.status = "error";
    }

    return state;
}

export async function sendContactMail(prevState: ContactMailState | undefined, formData: FormData) {
    const state: ContactMailState = {};

    const token = formData.get('token') as string;

    if (!token) {
        state.status = 'ReCaptcha error';
        return state;
    }

    const reCaptchaResponse = await verifyReCaptcha(token);

    if (!reCaptchaResponse.success) {
        state.status = 'ReCaptcha error';
        return state;
    }

    const MakeContact = ContactMailSchema.omit({token: true});

    const validatedFields = MakeContact.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });


    if (!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors;
        state.status = 'rejected';

        return state;
    }

    const {name, email, message} = validatedFields.data;
    const mailText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    const response = await sendMail({
        email: email,
        subject: 'New Contact Us Form',
        text: mailText,
    });

    if (response?.messageId) {
        state.status = "success";
    } else {
        state.status = "error";
    }

    return state;
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("nodemailer", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
