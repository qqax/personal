import {ConcertDescriptionHeader} from "@/app/[locale]/concerts/@description/[concert_id]/concertDescriptionHeader";
import clsx from "clsx";
import Image from "next/image";
import {Programme} from "@/app/[locale]/concerts/@description/[concert_id]/programme";
import {ConcertDescription} from "@/app/db/definitions";

//TODO: concert poster

export const ConcertDescriptionView = ({concertDescription}: {concertDescription: ConcertDescription}) => {
    return (<div className={"flex flex-col w-full h-full gap-4 p-4 overflow-auto"}>
        <ConcertDescriptionHeader date={concertDescription?.date as Date}/>
        <div className={"text-center text-2xl text-beige"}>Description</div>
        <div className={"flex w-full gap-4"}>
            <div className={clsx("relative flex flex-col gap-4", concertDescription?.poster ? "w-2/3" : "w-full")}>
                <div>{concertDescription?.place}</div>
                <div>{concertDescription?.address}</div>
                {concertDescription?.link &&
                    <a href={concertDescription.link as string}
                       className={"max-w-72 underline text-green-400 hover:text-green-300 truncate"}>{concertDescription.link}</a>}
            </div>
            {concertDescription?.poster &&
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
        {concertDescription?.description && <Programme programme={concertDescription.description}/>}
        {concertDescription?.recordsTable &&
            <div className={"relative overflow-hidden w-full pt-[56.25%]"}>
                <iframe src={concertDescription.recordsTable.link}
                        title={concertDescription.recordsTable.title}
                        className={"absolute top-0 left-0 right-0 bottom-0 w-full h-full"}
                        allowFullScreen/>
            </div>}
    </div>)
}