"use client"

import React from "react";
import {addMailoutEmail} from "@/app/lib/actions";
import {Input, InputError} from "@/app/ui/Input";
import {WaitButton} from "@/app/ui/Button";
import FormHandler, {FormHandlerProps} from "@/app/components/hoc/formHandler";
import {useTranslations} from "next-intl";

const NewsFormComponent = ({ref, state, onSubmit, isPending, buttonClassName}: FormHandlerProps) => {
    const t = useTranslations('NewsForm');

    return (<form ref={ref} onSubmit={onSubmit} className={"flex flex-col"}>
        <label htmlFor="email" className={"mb-4"}>{t("title")}</label>
        <Input id="email" name={"email"} placeholder={t("placeholder")} type="email" disabled={isPending} aria-describedby="email-error" required/>
        <InputError id="email-error" errorMessage={state?.errors?.email?.join(". ")}/>

        <WaitButton disabled={isPending} className={buttonClassName} text={t("button")}/>
    </form>);
}

export default function NewsForm({buttonClassName}: { buttonClassName: string }) {
    return (<FormHandler action={addMailoutEmail} Component={NewsFormComponent} buttonClassName={buttonClassName} reCaptchaAction={"news_form_submit"}/>);
}