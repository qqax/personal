'use server';

import {z} from 'zod';
import {sendMail} from "@/app/acions/sendMail";
import verifyReCaptcha from "@/app/acions/reCaptcha";
import {insertEmail} from "@/app/db/data";

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
    errors?: Record<string, any>;
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
