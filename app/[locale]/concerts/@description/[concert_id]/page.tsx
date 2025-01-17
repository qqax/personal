import {fetchConcertDescription} from "@/app/db/data";
import {getLocale} from "next-intl/server";
import {ConcertDescriptionView} from "@/app/[locale]/concerts/@description/[concert_id]/ConcertDescriptionView";


export default async function ConcertDescription({params}: { params: { concert_id: string } }) {
    const locale = await getLocale();
    const {concert_id} = await params;
    const concertDescription = await fetchConcertDescription(concert_id, locale);

    if (!concertDescription) {
        return null;
    }

    return (<ConcertDescriptionView concertDescription={concertDescription}/>)
}
