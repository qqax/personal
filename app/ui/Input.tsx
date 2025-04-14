import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (<input {...props}
                   className={"peer w-full text-black rounded-none border outline-none border-gray-400 focus:border-teal-900 p-1 disabled:cursor-progress"}/>);
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (<textarea {...props}
                      className={"peer w-full text-black rounded-none border outline-none border-gray-400 p-1 focus:border-teal-900 disabled:cursor-progress"}/>);
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