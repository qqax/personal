'use client'

import {useState} from "react";
import Modal from "@/app/ui/Modal";
import {usePathname, useRouter} from "@/i18n/routing";
import {deleteLastSegmentIfExists} from "@/app/utils/pathFuncs";
import {paths} from "@/app/components/navbar/navigation";
import {ConcertDescription} from "@/app/db/definitions";
import {ConcertDescriptionView} from "@/app/[locale]/concerts/@description/[concert_id]/ConcertDescriptionView";

export default function ConcertModalPage ({concertDescription}: {concertDescription: ConcertDescription}) {
    const [show, setShow] = useState(true);
    const router = useRouter();
    const path = usePathname();

    const onClose = () => {
        setShow(false);
        const newPath = deleteLastSegmentIfExists(path, paths.concerts);
        router.push({pathname: newPath});
    }

    return (<Modal show={show}>
        <button type={"button"} onClick={onClose}>Close</button>
        <ConcertDescriptionView concertDescription={concertDescription}/>
    </Modal>)
}