import React from "react";
import { inputStyle } from "@/app/ui/styles.ts";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (<input {...props} className={inputStyle}/>);
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (<textarea {...props} className={inputStyle}/>);
}

export function InputError({ id, errorMessage }: { id: string, errorMessage: string | undefined }) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true" className={"min-h-6"}>
            {errorMessage &&
                <p className={"text-sm text-red-500"} key={id}>
                    {errorMessage}
                </p>
            }
        </div>);
}