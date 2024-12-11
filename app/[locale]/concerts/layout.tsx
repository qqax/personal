import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {ReactNode} from "react";
import {MainSection} from "@/app/[locale]/concerts/components/mainSection";

const ConcertsSection = async ({children, description}: { children: ReactNode, description: ReactNode }) => {
    return (
        <section className={clsx("flex h-screen gap-4 p-10 border-[1px] border-green-600", bgStyle)}>
            <MainSection/>
            {children}
            <div className={"flex w-96 h-full"}>
                {description}
            </div>
        </section>
    );
};

export default ConcertsSection;