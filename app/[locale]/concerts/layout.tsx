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
        <>
            <ConcertMenu className={"top-[88px] flex md:hidden"} concerts={concerts}/>
            <section
                className={clsx("relative flex md:overflow-auto pt-[73px] w-full md:h-svh xl:gap-8 md:border-[1px] border-green-600", bgStyle)}>
                <ConcertMenu className={"hidden md:flex top-0"} concerts={concerts}/>
                <div className={"hidden xl:block pl-2"}>
                    <ConcertsCalendar concerts={concerts}/>
                    <NewsForm buttonClassName={concertSectionButtonColors}/>
                </div>
                <ConcertsList concerts={concerts} firstUpcomingConcertIndex={firstUpcomingConcertIndex}/>
                <div className={"hidden md:block w-full"}>
                    {description}
                </div>
                {children}
            </section>
        </>
    );
};

export default ConcertsSection;