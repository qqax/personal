"use client";

import Modal from "@/app/ui/Modal";
import { usePathname, useRouter } from "@/i18n/routing";
import { deleteLastSegmentIfExists } from "@/app/utils/pathFuncs";
import type { ConcertDescription } from "@/app/lib/definitions";
import { DescriptionView } from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionView";
import React, { Suspense, useRef } from "react";
import { useClickOutside } from "@/app/components/hooks";
import { paths } from "@/app/components/navbar/menuTypes";
import Fallback from "@/app/ui/loading/Fallback.tsx";
import {
    DescriptionHeader
} from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionHeader.tsx";
import { bgStyle } from "@/app/ui/styles.ts";
import clsx from "clsx";

export default function DescriptionModal({ concertDescription }: { concertDescription: ConcertDescription }) {
    const router = useRouter();
    const path = usePathname();
    const ref = useRef<HTMLDivElement>(null);

    const onClose = () => {
        const newPath = deleteLastSegmentIfExists(path, paths.concerts);
        router.push({ pathname: newPath });
    };

    useClickOutside(ref, () => {
        onClose();
    });

    return (<Modal show={!path.endsWith(paths.concerts)} preventScroll={true}>
        <div ref={ref}
             className={clsx(bgStyle, "relative flex flex-col w-full max-w-[450px] pt-10 m-20 min-h-[75%] mx-auto")}>
            <button type={"button"} onClick={onClose}
                    className={"absolute top-0 right-0 rotate-45 px-4 text-4xl text-beige"}>
                +
            </button>
            <DescriptionHeader date={concertDescription?.date as Date}/>
            <Suspense fallback={<Fallback/>}>
                <DescriptionView concertDescription={concertDescription}/>
            </Suspense>
        </div>
    </Modal>);
}