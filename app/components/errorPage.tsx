'use client'; // Error boundaries must be Client Components

import {useEffect} from 'react';
import {bgStyle, buttonColors} from "@/app/ui/styles";
import clsx from "clsx";

export default function ErrorPage({
                                      error,
                                      reset,
                                  }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className={clsx(bgStyle, "flex flex-col h-40 my-auto text-beige text-2xl items-center justify-center p-4 gap-6")}>
            <h2>Something went wrong!</h2>
            <button
                className={clsx(buttonColors, "p-2 rounded text-base")}
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}