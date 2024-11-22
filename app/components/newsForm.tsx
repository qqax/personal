"use client"

import React from "react";
import {addMailoutEmail} from "@/app/lib/actions";
import {Input, InputError} from "@/app/ui/Input";
import {WaitButton} from "@/app/ui/Button";
import FormHandler, {CustomThProps} from "@/app/components/hoc/formHandler";

const NewsFormComponent = ({ref, state, onSubmit, isPending}: CustomThProps) => {
    return (<form ref={ref} onSubmit={onSubmit} className={"flex flex-col"}>
        <label htmlFor="email" className={"mb-4"}>Subscribe to news!</label>
        <Input id="email" name={"email"} placeholder={"Enter your email"} type="email" disabled={isPending} aria-describedby="email-error" required/>
        <InputError id="email-error" errorMessage={state?.errors?.email?.join(". ")}/>

        <WaitButton disabled={isPending} className={"bg-blue-700 hover:bg-blue-600 text-white disabled:bg-blue-600"} text={"Send"}/>
    </form>);
}

export default function NewsForm() {
    return (<FormHandler action={addMailoutEmail} Component={NewsFormComponent} reCaptchaAction={"news_form_submit"}/>);
}