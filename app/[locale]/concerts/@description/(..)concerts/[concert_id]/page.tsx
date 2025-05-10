import { getLocale } from "next-intl/server";
import { fetchConcertDescription } from "@/app/lib/data";
import { RenderBoundary } from "@/app/components/renderBoundary";
import Fallback from "@/app/ui/loading/Fallback.tsx";
import React, { Suspense } from "react";
import { Description } from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/description.tsx";

export default async function ConcertModal({ params }: { params: Promise<{ concert_id: string }> }) {
    const locale = await getLocale();
    const { concert_id } = await params;

    if (concert_id === "(..)concerts") {
        return null;
    }

    const concertDescription = await fetchConcertDescription(concert_id, locale);

    if (!concertDescription) {
        return null;
    }

    return (
        <RenderBoundary>
            <Suspense fallback={<Fallback/>}>
                <Description concertDescription={concertDescription}/>
            </Suspense>
        </RenderBoundary>
    );
}