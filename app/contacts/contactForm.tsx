'use client'

import {FormEvent, startTransition, useActionState, useCallback, useEffect, useRef} from 'react';
import {sendContactMail, State} from "@/app/lib/actions";
import {Input, InputError, TextArea} from "@/app/ui/Input";
import {toast} from "sonner";
import {WaitButton} from "@/app/ui/Button";
import {useReCaptcha} from "next-recaptcha-v3";

export default function ContactForm() {
    const ref = useRef<HTMLFormElement>(null);
    const initialState: State = {errors: {}, status: null};
    const [state, formAction, isPending] = useActionState(sendContactMail, initialState);

    const { executeRecaptcha } = useReCaptcha();

    const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        state.status = null;
        state.errors = {};

        const fd = new FormData(event.currentTarget);

        const token = await executeRecaptcha("contact_form_submit");
        fd.append("token", token);

        startTransition(() => formAction(fd));
    }, []);

    useEffect(() => {
        if (!isPending && !!state.status) {
            switch (state.status) {
                case 'success':
                    ref.current?.reset();
                    state.status = null;
                    state.errors = {};
                    toast.success('Email sent successfully.');
                    break;
                case 'rejected':
                    toast.error('Wrong form submission.');
                    break;
                case 'error':
                    toast.error('Failed to send email.');
                    break;
                default:
                    toast.error('Unexpected error.');
            }
        }

    }, [isPending, state.status]);

    return (<form ref={ref} onSubmit={onSubmit} className={"flex flex-col"}>
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

        <WaitButton disabled={isPending}/>
    </form>);
}