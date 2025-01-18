'use client'

import {useMd} from "@/app/components/hooks";

export const DefaultPage = () => {
    const isMd = useMd();

    return (
        isMd
            ? <div className={"flex w-full h-full justify-center items-center"}>No Data</div>
            : null
    )
}