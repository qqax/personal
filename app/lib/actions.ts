'use server';

import {z} from 'zod';
import {sendMail} from "@/app/lib/sendMail";
import {revalidatePath} from "next/cache";

const ContactMailSchema = z.object({
    name: z.string().min(2, {message: 'Please Enter Your Name'}),
    email: z.string().email({message: 'Please Enter a Valid Email Address'}),
    message: z
        .string()
        .min(10, {message: 'Please make sure your message is at least 10 characters long.'}),
    token: z.string().min(10, {message: 'Unexpected error occurred.'}),
});

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    status?: "rejected" | "error" | "success" | "ReCaptcha error" | null;
};

export async function sendContactMail(prevState: State | undefined, formData: FormData) {
    const state: State = {};

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

    const MakeContact = ContactMailSchema.omit({ token: true });

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

    revalidatePath('/contacts');

    return state;
}

type ReCaptchaResponse = {
    "success": true|false,
    "challenge_ts": string,
    "hostname": string,
    "error-codes": string[]
}

export default async function verifyReCaptcha(token: string): Promise<ReCaptchaResponse> {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    try {
        const response = await fetch(url, {method: "POST"});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Fetch error: ${error}`);
    }
}
