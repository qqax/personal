"use client";

import React from "react";
import { sendContactMail } from "@/app/acitons/actions";
import { Input, InputError, TextArea } from "@/app/ui/Input";
import { WaitButton } from "@/app/ui/Button";
import FormHandler, { type FormHandlerProps } from "@/app/components/forms/formHandler";
import { useTranslations } from "next-intl";

const ContactFormComponent = ({ ref, state, onSubmit, isPending }: FormHandlerProps) => {
    const t = useTranslations("Contacts");
    const name = t("name");
    const message = t("message");
    const send = t("send");

    return (<form ref={ref} onSubmit={onSubmit} className={"flex flex-col w-full"}>
        <label htmlFor="name" className={"mb-2"}>{name}</label>
        <Input id="name" name={"name"} type="text" disabled={isPending} aria-describedby="name-error" required/>
        <InputError id="name-error" errorMessage={state?.errors?.name?.join(". ")}/>

        <label htmlFor="email" className={"mb-2"}>Email:</label>
        <Input id="email" name={"email"} type="email" disabled={isPending} aria-describedby="email-error" required/>
        <InputError id="email-error" errorMessage={state?.errors?.email?.join(". ")}/>

        <label htmlFor="message" className={"mb-2"}>{message}</label>
        <TextArea id="message" name="message" rows={4} disabled={isPending} cols={50} aria-describedby="message-error"
                  required/>
        <InputError id="message-error" errorMessage={state?.errors?.message?.join(". ")}/>

        <WaitButton disabled={isPending} text={send}/>
    </form>);
};

export default function ContactForm() {
    return (<FormHandler toastMessages={"Contacts"} action={sendContactMail} Component={ContactFormComponent}
                         reCaptchaAction={"contact_form_submit"}/>);
}