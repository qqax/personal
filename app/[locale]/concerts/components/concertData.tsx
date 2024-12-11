import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import ConcertsList from "@/app/[locale]/concerts/components/concertsList";
import {getLocale} from "next-intl/server";
import {fetchConcerts} from "@/app/db/data";
import './Calendar.css';
import {connection} from "next/server";

export const ConcertData = async () => {
    await connection();

    const locale = await getLocale();
    const {concerts, firstUpcomingConcertIndex} = await fetchConcerts(locale);
    return (<div className={"flex gap-4"}>
        <div>
            <ConcertsCalendar/>
            <NewsForm buttonClassName={"bg-green-700 hover:bg-green-600"}/>
        </div>
        <ConcertsList concerts={concerts} firstUpcomingConcertIndex={firstUpcomingConcertIndex}/>
    </div>)
}

