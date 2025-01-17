import ConcertModalPage from "@/app/[locale]/concerts/@modal/(..)concerts/[concert_id]/ConcertModal";
import {getLocale} from "next-intl/server";
import {fetchConcertDescription} from "@/app/db/data";

export default async function ConcertModal({params}: { params: { concert_id: string } }) {
    const locale = await getLocale();
    const {concert_id} = await params;
    const concertDescription = await fetchConcertDescription(concert_id, locale);

    if (!concertDescription) {
        return null;
    }

    return (<ConcertModalPage concertDescription={concertDescription}/>)
}