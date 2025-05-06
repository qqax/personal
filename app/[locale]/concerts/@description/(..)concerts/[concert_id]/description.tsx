"use client";

import { useMd } from "@/app/components/hooks";
import DescriptionModal from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionModal";
import type { ConcertDescription } from "@/app/lib/definitions";
import { DescriptionView } from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionView";
import React, { Suspense } from "react";
import Fallback from "@/app/ui/loading/Fallback.tsx";
import {
    DescriptionHeader
} from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionHeader.tsx";
import clsx from "clsx";
import { bgStyle } from "@/app/ui/styles.ts";

export const Description = ({ concertDescription }: { concertDescription: ConcertDescription }) => {
    const isMd = useMd();

    if (isMd) {
        return (
            <div className={clsx(bgStyle, "w-full")}>
                <DescriptionHeader date={concertDescription?.date as Date}/>
                <Suspense fallback={<Fallback/>}>
                    <DescriptionView concertDescription={concertDescription}/>
                </Suspense>
            </div>

        );
    }

    return (
        <DescriptionModal concertDescription={concertDescription}/>
    );
};