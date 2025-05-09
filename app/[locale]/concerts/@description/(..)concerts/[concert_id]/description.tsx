"use client";

import type { ConcertDescription } from "@/app/lib/definitions";
import { DescriptionView } from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionView";
import React, { Suspense } from "react";
import Fallback from "@/app/ui/loading/Fallback.tsx";

export const Description = ({ concertDescription }: { concertDescription: ConcertDescription }) => {
    return (
        <Suspense fallback={<Fallback/>}>
            <DescriptionView concertDescription={concertDescription}/>
        </Suspense>
    );
};