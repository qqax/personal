import React, {
    type FormEvent,
    type FunctionComponent,
    type RefObject,
    startTransition,
    useActionState,
    useCallback,
    useEffect,
    useRef,
} from "react";
import type { StatusState } from "@/app/acitons/actions";
import { useReCaptcha } from "next-recaptcha-v3";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export type FormHandlerProps = {
    ref: RefObject<HTMLFormElement>;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isPending: boolean;
    state: StatusState;
    buttonClassName?: string
}

export default function FormHandler({ Component, action, reCaptchaAction, toastMessages }: {
    action: (state: Awaited<StatusState & { errors?: object }>, payload: FormData) => Promise<StatusState & {
        errors?: object
    }>,
    Component: FunctionComponent<FormHandlerProps>,
    reCaptchaAction: string,
    toastMessages: string
}) {
    const ref = useRef<HTMLFormElement>(null);
    const initialState: StatusState = { errors: {}, status: null };
    const [state, formAction, isPending] = useActionState(action, initialState);

    const { executeRecaptcha } = useReCaptcha();

    const t = useTranslations(`Toast.${toastMessages}`);

    const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        state.status = null;
        state.errors = {};

        const fd = new FormData(event.currentTarget);

        const token = await executeRecaptcha(reCaptchaAction);
        fd.append("token", token);

        startTransition(() => formAction(fd));
    }, []);

    useEffect(() => {
        if (!isPending && !!state.status) {
            switch (state.status) {
                case "success":
                    ref.current?.reset();
                    state.status = null;
                    state.errors = {};
                    toast.success(t("success"));
                    break;
                case "rejected":
                    toast.error(t("rejected"));
                    break;
                case "error":
                    toast.error(t("error"));
                    break;
                default:
                    toast.error(t("unexpected"));
            }
        }

    }, [isPending, state.status]);

    return <Component ref={ref} onSubmit={onSubmit} isPending={isPending}
                      state={state}/>;
}