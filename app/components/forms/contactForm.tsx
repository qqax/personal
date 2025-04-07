'use client';

import React from 'react';
import {sendContactMail} from "@/app/acitons/actions";
import {Input, InputError, TextArea} from "@/app/ui/Input";
import {WaitButton} from "@/app/ui/Button";
import FormHandler, {FormHandlerProps, toastMessages} from "@/app/components/forms/formHandler";

const ContactFormComponent = ({ref, state, onSubmit, isPending}: FormHandlerProps) => {
    return (<form ref={ref} onSubmit={onSubmit} className={"flex flex-col w-full"}>
        <label htmlFor="name" className={"mb-2"}>Name:</label>
        <Input id="name" name={"name"} type="text" disabled={isPending} aria-describedby="name-error" required/>
        <InputError id="name-error" errorMessage={state?.errors?.name?.join(". ")}/>

        <label htmlFor="email" className={"mb-2"}>Email:</label>
        <Input id="email" name={"email"} type="email" disabled={isPending} aria-describedby="email-error" required/>
        <InputError id="email-error" errorMessage={state?.errors?.email?.join(". ")}/>

        <label htmlFor="message" className={"mb-2"}>Your message:</label>
        <TextArea id="message" name="message" rows={4} disabled={isPending} cols={50} aria-describedby="message-error"
                  required/>
        <InputError id="message-error" errorMessage={state?.errors?.message?.join(". ")}/>

        <WaitButton disabled={isPending} text={"Send message"}/>
    </form>);
};

const contactFormMessages: toastMessages = {
    success: 'Email sent successfully.',
    rejected: 'Wrong form submission.',
    error: 'Failed to send email.',
    unexpected: 'Unexpected error.',
};

export default function ContactForm() {
    return (<FormHandler toastMessages={contactFormMessages} action={sendContactMail} Component={ContactFormComponent}
                         reCaptchaAction={"contact_form_submit"}/>);
}