'use client';

import { useMd } from "@/app/components/hooks";
import DescriptionModal from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionModal";
import type { ConcertDescription } from "@/app/lib/definitions";
import { DescriptionView } from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionView";

export const Description = ({ concertDescription }: { concertDescription: ConcertDescription }) => {
    const isMd = useMd();

    if (isMd) {
        return (
            <div className={"block w-full"}>
                <DescriptionView concertDescription={concertDescription}/>
            </div>
        );
    }

    return (
        <DescriptionModal concertDescription={concertDescription}/>
    );
};