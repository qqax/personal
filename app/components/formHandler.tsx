import React, {
    FormEvent,
    FunctionComponent, RefObject,
    startTransition,
    useActionState,
    useCallback,
    useEffect,
    useRef
} from "react";
import {StatusState} from "@/app/lib/actions";
import {useReCaptcha} from "next-recaptcha-v3";
import {toast} from "sonner";

export type CustomThProps = {
    ref: RefObject<HTMLFormElement>;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isPending: boolean;
    state: StatusState;
}

export default function FormHandler({Component, action, ...props}: {
    action: (state: Awaited<StatusState & { errors?: {} }>, payload: FormData) => Promise<StatusState & {
        errors?: {}
    }>,
    Component: FunctionComponent<CustomThProps>
}) {
    const ref = useRef<HTMLFormElement>(null);
    const initialState: StatusState = {errors: {}, status: null};
    const [state, formAction, isPending] = useActionState(action, initialState);

    const {executeRecaptcha} = useReCaptcha();

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

    return <Component ref={ref} onSubmit={onSubmit} {...props} isPending={isPending} state={state}/>
}