import {getLocale} from "next-intl/server";
import {fetchConcertDescription} from "@/app/db/data";
import {Description} from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/description";
import {RenderBoundary} from "@/app/components/renderBoundary";

export default async function ConcertModal({params}: { params: { concert_id: string } }) {
    const locale = await getLocale();
    const {concert_id} = await params;

    if (concert_id === "(..)concerts") {
        return null;
    }

    const concertDescription = await fetchConcertDescription(concert_id, locale);

    if (!concertDescription) {
        return null;
    }

    return (
        <RenderBoundary>
            <Description concertDescription={concertDescription}/>
        </RenderBoundary>
    )
}