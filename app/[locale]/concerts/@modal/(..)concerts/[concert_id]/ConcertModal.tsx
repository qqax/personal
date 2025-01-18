'use client'

import Modal from "@/app/ui/Modal";
import {usePathname, useRouter} from "@/i18n/routing";
import {deleteLastSegmentIfExists} from "@/app/utils/pathFuncs";
import {paths} from "@/app/components/navbar/navigation";
import {ConcertDescription} from "@/app/db/definitions";
import {ConcertDescriptionView} from "@/app/[locale]/concerts/@description/[concert_id]/ConcertDescriptionView";
import {useRef} from "react";
import {useClickOutside} from "@/app/components/hooks";

export default function ConcertModalPage ({concertDescription}: {concertDescription: ConcertDescription}) {
    const router = useRouter();
    const path = usePathname();
    const ref = useRef<HTMLDivElement>(null);

    const onClose = () => {
        const newPath = deleteLastSegmentIfExists(path, paths.concerts);
        router.push({pathname: newPath});
    }

    useClickOutside(ref, () => {
        onClose();
    });

    return (<Modal show={!path.endsWith(paths.concerts)}>
        <div ref={ref} className="bg-black w-full sm:w-auto m-24 mx-auto border-[1px] border-gray-200">
            <button type={"button"} onClick={onClose} className={"rotate-45 block ml-auto mr-0 px-4 text-4xl"}>+</button>
            <ConcertDescriptionView concertDescription={concertDescription}/>
        </div>
    </Modal>)
}