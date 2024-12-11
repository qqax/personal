import {fetchConcertDescription, fetchConcertIDs} from "@/app/db/data";
import {getLocale} from "next-intl/server";
import Image from "next/image";
import clsx from "clsx";
import {Programme} from "@/app/[locale]/concerts/components/programme";
import {ConcertDescriptionHeader} from "@/app/[locale]/concerts/components/concertDescriptionHeader";

//TODO: concert poster & programme

export default async function ConcertDescription({params}: { params: { concert_id: string } }) {
    const locale = await getLocale();
    const {concert_id} = await params;
    const concertDescription = await fetchConcertDescription(concert_id, locale);
    const concertIDs = await fetchConcertIDs();

    if (!concertDescription) {
        return null;
    }

    return (<div className={"flex flex-col h-full w-full gap-16 overflow-auto px-4"}>
        <div className={"flex flex-col gap-8"}>
            <ConcertDescriptionHeader concertIDs={concertIDs} concertID={concert_id} date={concertDescription.date as Date}/>

            <div className={"text-center text-2xl text-beige"}>Description</div>
            <div className={"flex w-full gap-4"}>
                <div className={clsx("relative flex flex-col gap-4", concertDescription.poster ? "w-2/3" : "w-full")}>

                    <div>{concertDescription.place}</div>
                    <div>{concertDescription.address}</div>
                    {concertDescription.link &&
                        <a href={concertDescription.link as string}
                           className={"w-full underline text-green-400 hover:text-green-300 truncate"}>{concertDescription.link}</a>}
                </div>
                {concertDescription.poster &&
                    <Image
                        src="/portrait.jpg"
                        alt={"artist_photo"}
                        className={"w-1/3"}
                        width={1177}
                        height={1772}
                        priority
                    />
                }
            </div>
            {concertDescription.description && <Programme programme={concertDescription.description}/>}
        </div>
        {concertDescription.recordsTable &&
            <iframe src={concertDescription.recordsTable.link}
                    title={concertDescription.recordsTable.title}
                    width={"100%"}
                    height={"40%"}
                    allowFullScreen/>}
    </div>)
}