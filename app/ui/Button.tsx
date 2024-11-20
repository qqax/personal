import clsx from "clsx";

export const WaitButton = ({disabled, className, text}: { disabled: boolean, className?: string, text: string }) => {
    return (
        <button type={"submit"} disabled={disabled}
                className={clsx(className ? className : "", "transition duration-150 py-1 disabled:text-gray-500 disabled:cursor-progress")}>
            {text}
        </button>)
}