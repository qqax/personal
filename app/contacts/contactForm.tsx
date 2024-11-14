'use client'

import {useActionState} from 'react';
import {sendContactMail, State} from "@/app/lib/actions";
import {Input, TextArea} from "@/app/ui/Input";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";

export default function ContactForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(sendContactMail, initialState);

    return (<form action={formAction} className={"flex flex-col gap-4"}>
        <label htmlFor="name">Name:</label>
        <Input id="name" name={"name"} type="text" aria-describedby="name-error" required/>
        <div id="name-error" aria-live="polite" aria-atomic="true">
            {state?.errors && state.errors.name &&
                <p className="text-sm text-red-500" key={state.errors.name.join(" ")}>
                    {state.errors.name.join(" ")}
                </p>
            }
        </div>

        <label htmlFor="email">Email:</label>
        <Input id="email" name={"email"} type="email" aria-describedby="email-error" required/>
        <div id="email-error" aria-live="polite" aria-atomic="true">
            {state?.errors && state.errors.email &&
                <p className="text-sm text-red-500" key={state.errors.email.join(" ")}>
                    {state.errors.email.join(" ")}
                </p>
            }
        </div>

        <label htmlFor="message">Your message:</label>
        <TextArea id="message" name="message" rows={4} cols={50} aria-describedby="message-error" required/>
        <div id="message-error" aria-live="polite" aria-atomic="true">
            {state?.errors && state.errors.message &&
                <p className={clsx("text-sm text-red-500  p-2 bg-opacity-20", bgStyle)} key={state.errors.message.join(" ")}>
                    {state.errors.message.join(" ")}
                </p>
            }
        </div>

        <button type={"submit"} className={"bg-amber-300 text-black py-1"}>Send message</button>
    </form>);
}