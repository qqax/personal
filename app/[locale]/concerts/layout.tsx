import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {ReactNode} from "react";
import {ConcertData} from "@/app/[locale]/concerts/ConcertData";

const ConcertsSection = async ({children}: { children: ReactNode }) => {
    return (
        <div className={clsx("p-10 border-[1px] border-green-600", bgStyle)}>
            <ConcertData/>
            {children}
        </div>
    );
};

export default ConcertsSection;