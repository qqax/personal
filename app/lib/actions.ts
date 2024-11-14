'use server';

import {z} from 'zod';
import {sendMail} from "@/app/lib/sendMail";
import {revalidatePath} from "next/cache";
import {toast} from "sonner";

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
    message?: string | null;
};

export async function sendContactMail(prevState: State | undefined, formData: FormData) {
    const validatedFields = ContactMailSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Email.',
        };
    }

    const {name, email, message} = validatedFields.data;
    const mailText = `Name: ${name}\n  Email: ${email}\nMessage: ${message}`;

    const response = await sendMail({
        email: email,
        subject: 'New Contact Us Form',
        text: mailText,
    });

    if (response?.messageId) {
        toast.info('Email sent successfully.');
    } else {
        toast.error('Failed to send email.');
    }

    revalidatePath('/contacts');
}