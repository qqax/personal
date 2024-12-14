'use client'

import clsx from "clsx";
import {ConcertDate} from "@/app/[locale]/concerts/components/concertDate";
import {ConcertIDs} from "@/app/db/definitions";
import {usePathname, useRouter} from "@/i18n/routing";
import {concertSectionButtonColors} from "@/app/ui/styles";

export function ConcertDescriptionHeader({concertID, date, concertIDs}: { concertIDs: ConcertIDs, concertID: string, date: Date }) {
    const currentIndex = concertIDs.findIndex(({id}) => id === concertID);
    const router = useRouter();
    const path = usePathname();

    const prevConcert = () => {
        const newIndex = currentIndex === 0 ? concertIDs.length - 1 : currentIndex - 1;
        router.push({pathname: path.replace(/(concerts).*$/g, '$1') + "/" + concertIDs[newIndex].id});
    }

    const nextConcert = () => {
        const newIndex = (currentIndex + 1) % concertIDs.length;
        router.push({pathname: path.replace(/(concerts).*$/g, '$1') + "/" + concertIDs[newIndex].id});
    }

    return (<div className={"flex items-center gap-3"}>
        <button type={"button"}
                onClick={prevConcert}
                className={clsx(concertSectionButtonColors, "p-2 whitespace-nowrap transition duration-150")}>{"< Prev"}</button>
        <ConcertDate dateTime={date}/>
        <button type={"button"}
                onClick={nextConcert}
                className={clsx(concertSectionButtonColors, "p-2 whitespace-nowrap transition duration-150")}>{"Next >"}</button>
    </div>)
}