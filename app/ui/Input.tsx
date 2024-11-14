import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (<input {...props}
                   className={"peer text-black rounded-none border outline-amber-300 border-gray-800 p-1 outline-1"}/>);
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (<textarea {...props}
                      className={"peer text-black rounded-none border outline-amber-300 border-gray-800 p-1 outline-1"}/>);
}

export function InputError({id, errorMessage}: {id: string, errorMessage: string | undefined}) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true" className={"min-h-6"}>
            {errorMessage &&
                <p className={"text-sm text-red-500"} key={id}>
                    {errorMessage}
                </p>
            }
        </div>);
}