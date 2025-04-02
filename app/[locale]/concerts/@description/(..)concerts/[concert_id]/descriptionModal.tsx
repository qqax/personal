'use client';

import Modal from "@/app/ui/Modal";
import {usePathname, useRouter} from "@/i18n/routing";
import {deleteLastSegmentIfExists} from "@/app/utils/pathFuncs";
import {paths} from "@/app/components/navbar/navigation";
import {ConcertDescription} from "@/app/lib/definitions";
import {DescriptionView} from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionView";
import {useRef} from "react";
import {useClickOutside} from "@/app/components/hooks";

export default function DescriptionModal({concertDescription}: { concertDescription: ConcertDescription }) {
    const router = useRouter();
    const path = usePathname();
    const ref = useRef<HTMLDivElement>(null);

    const onClose = () => {
        const newPath = deleteLastSegmentIfExists(path, paths.concerts);
        router.push({pathname: newPath});
    };

    useClickOutside(ref, () => {
        onClose();
    });

    return (<Modal show={!path.endsWith(paths.concerts)}>
        <div ref={ref}
             className="relative flex bg-black w-full max-w-[450px] pt-10 m-20 min-h-[75%] mx-auto border-[1px] border-gray-200">
            <button type={"button"} onClick={onClose} className={"absolute top-0 right-0 rotate-45 px-4 text-4xl"}>
                +
            </button>
            <DescriptionView concertDescription={concertDescription}/>
        </div>
    </Modal>);
}