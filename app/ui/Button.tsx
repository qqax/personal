export const WaitButton = ({disabled}: {disabled: boolean}) => {
    return <button type={"submit"} disabled={disabled}
                   className={"bg-amber-300 text-black py-1 disabled:bg-amber-200 disabled:text-gray-500 disabled:cursor-progress"}>Send message
    </button>
}