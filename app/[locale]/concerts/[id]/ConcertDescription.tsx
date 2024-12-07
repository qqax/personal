import {fetchConcertDescription} from "@/app/db/data";
import {getLocale} from "next-intl/server";

export default async function ConcertDescription() {
    const locale = await getLocale();

    const date = new Date("2025-09-01 19:00:00.000000");

    const concertDescription = await fetchConcertDescription(date, locale);
    console.log(concertDescription);

    return (<div>Description</div>)
}