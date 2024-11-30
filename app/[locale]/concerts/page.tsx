'use server'

import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import './Calendar.css';
import Link from "next/link";
import {fetchConcerts} from "@/app/db/data";
import {getLocale} from "next-intl/server";
import {Concerts} from "@/app/db/definitions";
import {ConcertsCalendar} from "@/app/[locale]/concerts/Calendar";
import {ConcertsList} from "@/app/[locale]/concerts/concertsList";


const getFirstUpcomingDate = (concerts: Concerts): Date | undefined => {
    const date = new Date();
    const firstUpcomingConcert = concerts.find(concert => concert.date as Date > date);
    return firstUpcomingConcert?.date ?? undefined;
}

const ConcertsSection = async () => {
    const locale = await getLocale();
    const concerts = await fetchConcerts(locale);
    const firstUpcomingDate = getFirstUpcomingDate(concerts) as Date;

    return (
        <div className={clsx("p-10 border-[1px] border-green-600", bgStyle)}>
            <div className={"flex text-4xl justify-between mb-4"}>
                <h2 className={"text-center"}>Concerts:</h2>
                <Link href={"#August 13, 2024"}
                      className={clsx("transition duration-100", {"text-beige underline": !!firstUpcomingDate})}>upcoming</Link>/
                <Link href={"#August 13, 2024"}
                      className={clsx("transition duration-100", {"text-beige underline": !firstUpcomingDate})}>forgoing</Link>
            </div>
            <div className={"flex"}>
                <article>
                    <ConcertsCalendar/>
                </article>
               <ConcertsList schedule={concerts} firstUpcomingDate={firstUpcomingDate}></ConcertsList>
            </div>
        </div>

    );
};

export default ConcertsSection;