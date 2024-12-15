import {ConcertsCalendar} from "@/app/[locale]/concerts/components/Calendar";
import NewsForm from "@/app/components/forms/newsForm";
import ConcertsList from "@/app/[locale]/concerts/components/concertsList";
import {getLocale} from "next-intl/server";
import {fetchConcerts} from "@/app/db/data";
import './Calendar.css';
import {connection} from "next/server";
import {concertSectionButtonColors} from "@/app/ui/styles";

export const MainSection = async () => {
    await connection();

    const locale = await getLocale();
    const {concerts, firstUpcomingConcertIndex} = await fetchConcerts(locale);
    return (<div className={"flex gap-4"}>
        <div className={"hidden xl:block"}>
            <ConcertsCalendar concerts={concerts}/>
            <NewsForm buttonClassName={concertSectionButtonColors}/>
        </div>
        <ConcertsList concerts={concerts} firstUpcomingConcertIndex={firstUpcomingConcertIndex}/>
    </div>)
}

