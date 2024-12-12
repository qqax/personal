import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import ConcertsList from "@/app/[locale]/concerts/components/concertsList";
import {getLocale} from "next-intl/server";
import {fetchConcerts} from "@/app/db/data";
import './Calendar.css';
import {connection} from "next/server";

export const concertSectionButtonColors = "border-green-500 border-[1px] bg-green-900 hover:bg-green-800 bg-opacity-50 hover:bg-opacity-70";

export const MainSection = async () => {
    await connection();

    const locale = await getLocale();
    const {concerts, firstUpcomingConcertIndex} = await fetchConcerts(locale);
    return (<div className={"flex gap-4"}>
        <div>
            <ConcertsCalendar/>
            <NewsForm buttonClassName={concertSectionButtonColors}/>
        </div>
        <ConcertsList concerts={concerts} firstUpcomingConcertIndex={firstUpcomingConcertIndex}/>
    </div>)
}

