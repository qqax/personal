'use client'

import {FormEvent, startTransition, useActionState, useEffect, useRef} from 'react';
import {sendContactMail, State} from "@/app/lib/actions";
import {Input, InputError, TextArea} from "@/app/ui/Input";
import {toast} from "sonner";

export default function ContactForm() {
    const ref = useRef<HTMLFormElement>(null);
    const initialState: State = { errors: {}, status: null };
    const [state, formAction] = useActionState(sendContactMail, initialState);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        startTransition(async () => {
            formAction(fd);
        });
    }

    useEffect(() => {
        if (state.status === "submitted") {
            ref.current?.reset();
            state.status = null;
            state.errors = {};
            toast.success('Email sent successfully.');
        } else if (state.status === "error") {
            toast.error('Failed to send email.');
        }
    });

    return (<form ref={ref} onSubmit={onSubmit} className={"flex flex-col"}>
        <label htmlFor="name" className={"mb-2"}>Name:</label>
        <Input id="name" name={"name"} type="text" aria-describedby="name-error" required/>
        <InputError id="name-error" errorMessage={state?.errors?.name?.join(". ")}/>

        <label htmlFor="email" className={"mb-2"}>Email:</label>
        <Input id="email" name={"email"} type="email" aria-describedby="email-error" required/>
        <InputError id="email-error" errorMessage={state?.errors?.email?.join(". ")}/>

        <label htmlFor="message" className={"mb-2"}>Your message:</label>
        <TextArea id="message" name="message" rows={4} cols={50} aria-describedby="message-error" required/>
        <InputError id="message-error" errorMessage={state?.errors?.message?.join(". ")}/>

        <button type={"submit"} className={"bg-amber-300 text-black py-1"}>Send message</button>
    </form>);
}