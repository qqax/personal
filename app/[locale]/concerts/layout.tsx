import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {ReactNode} from "react";
import {ConcertData} from "@/app/[locale]/concerts/components/concertData";

const ConcertsSection = async ({children, description}: { children: ReactNode, description: ReactNode }) => {
    console.log(description);
    return (
        <div className={clsx("flex h-screen gap-4 p-10 border-[1px] border-green-600", bgStyle)}>
            <ConcertData/>
            {children}
            <div className={"flex w-96 h-full"}>
                {description}
            </div>
        </div>
    );
};

export default ConcertsSection;