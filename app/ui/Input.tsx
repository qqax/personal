import React from "react";

export function Input (props: React.InputHTMLAttributes<HTMLInputElement> ) {
    return (<input {...props} className={"peer text-black rounded-none border outline-amber-300 border-gray-800 p-1 outline-1"} />);
}

export function TextArea (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> ) {
    return (<textarea {...props} className={"peer text-black rounded-none border outline-amber-300 border-gray-800 p-1 outline-1"} />);
}