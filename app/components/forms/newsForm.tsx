"use client";

import React from "react";
import { addMailoutEmail } from "@/app/acitons/actions";
import { Input, InputError } from "@/app/ui/Input";
import { WaitButton } from "@/app/ui/Button";
import FormHandler, { type FormHandlerProps } from "@/app/components/forms/formHandler";
import { useTranslations } from "next-intl";

const NewsFormComponent = ({ ref, state, onSubmit, isPending }: FormHandlerProps) => {
    const t = useTranslations("NewsForm");

    return (<form ref={ref} onSubmit={onSubmit} className={"flex flex-col"}>
        <label htmlFor="email" className={"sr-only"}>{t("title")}</label>
        <Input id="email" name={"email"} placeholder={t("placeholder")} type="email" disabled={isPending}
               aria-describedby="email-error" required/>
        <InputError id="email-error" errorMessage={state?.errors?.email?.join(". ")}/>
        <WaitButton disabled={isPending} text={t("button")}/>
    </form>);
};

export default function NewsForm() {
    return (<FormHandler toastMessages={"News"} action={addMailoutEmail} Component={NewsFormComponent}
                         reCaptchaAction={"news_form_submit"}/>);
}