import {fetchConcertDescription} from "@/app/db/data";
import {getLocale} from "next-intl/server";
import {ConcertDate} from "@/app/[locale]/concerts/components/Date";
import Image from "next/image";
import clsx from "clsx";

export default async function ConcertDescription({params}: {params: {concert_id: string}}) {
    const locale = await getLocale();
    const {concert_id} = await params;
    const concertDescription = await fetchConcertDescription(concert_id, locale);

    if (!concertDescription) {
        return null;
    }

    return (<div className={"flex flex-col h-full w-full gap-16"}>
        <div className={"flex flex-col gap-10"}>
            <div className={"text-center text-2xl text-beige"}>Description</div>
            <div className={"flex w-full gap-4"}>
                <div className={clsx("relative flex flex-col gap-4", !concertDescription.poster ? "w-2/3" : "w-full")}>
                    <ConcertDate dateTime={concertDescription.date as Date}/>
                    <div>{concertDescription.place}</div>
                    <div>{concertDescription.address}</div>
                    {concertDescription.link &&
                        <a href={concertDescription.link as string}
                           className={"w-full text-green-400 truncate"}>{concertDescription.link}</a>}
                </div>
                {!concertDescription.poster &&
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
            <div className={"text-center text-2xl text-beige"}>Program</div>

            <div>{concertDescription.description}</div>
        </div>
        {concertDescription.recordsTable &&
            <iframe src={concertDescription.recordsTable.link}
                    title={concertDescription.recordsTable.title}
                    width={"100%"}
                    height={"40%"}
                    allowFullScreen/>}
    </div>)
}