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
});

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    status?: string | null;
};

export async function sendContactMail(prevState: State | undefined, formData: FormData) {
    const validatedFields = ContactMailSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    const state: State = {}

    if (!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors;
        state.status = 'pending';

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
        state.status = "submitted";
    } else {
        state.status = "error";
    }

    revalidatePath('/contacts');

    return state;
}