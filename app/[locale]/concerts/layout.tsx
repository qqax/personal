import clsx from "clsx";
import {bgStyle, concertSectionButtonColors} from "@/app/ui/styles";
import {ReactNode} from "react";
import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import ConcertsList from "@/app/[locale]/concerts/components/concertsList";
import {getLocale} from "next-intl/server";
import {fetchConcerts} from "@/app/db/data";
import {ConcertMenu} from "@/app/[locale]/concerts/components/concertMenu";

const ConcertsSection = async ({children, description}: { children: ReactNode, description: ReactNode }) => {
    const locale = await getLocale();
    const {concerts, firstUpcomingConcertIndex} = await fetchConcerts(locale);
    return (
        <section
            className={clsx("relative flex flex-col w-full md:h-svh xl:gap-8 p-4 lg:p-10 md:border-[1px] border-green-600", bgStyle)}>
            <ConcertMenu concerts={concerts}/>
            <div className={"flex justify-between w-full pt-16 overflow-auto"}>
                <div className={"flex w-full gap-8 justify-center xl:justify-between"}>
                    <div className={"hidden xl:block"}>
                        <ConcertsCalendar concerts={concerts}/>
                        <NewsForm buttonClassName={concertSectionButtonColors}/>
                    </div>
                    <ConcertsList concerts={concerts} firstUpcomingConcertIndex={firstUpcomingConcertIndex}/>
                </div>
                {children}
                <div className={"hidden md:flex w-full h-full"}>
                    {description}
                </div>
            </div>
        </section>
    );
};

export default ConcertsSection;