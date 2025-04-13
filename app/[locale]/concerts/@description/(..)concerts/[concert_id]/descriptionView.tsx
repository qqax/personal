import {DescriptionHeader} from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/descriptionHeader";
import clsx from "clsx";
import Image from "next/image";
import {Programme} from "@/app/[locale]/concerts/@description/(..)concerts/[concert_id]/programme";
import {ConcertDescription} from "@/app/lib/definitions";
import Record from "@/app/components/records/record";
import {recordService} from "@/app/lib/schema/enums";
import {RecordName} from "@/app/components/records/recordName";

//TODO: concert poster

export const DescriptionView = ({concertDescription}: { concertDescription: ConcertDescription }) => {
    return (<div className={"flex flex-col w-full h-full gap-4 p-4 overflow-x-hidden overflow-y-auto"}>
        <DescriptionHeader date={concertDescription?.date as Date}/>
        <div className={"text-center text-2xl text-beige"}>Description</div>
        <div className={"flex w-full gap-4"}>
            <div className={clsx("relative flex flex-col gap-4", concertDescription?.poster ? "w-2/3" : "w-full")}>
                <div>{concertDescription?.place}</div>
                <div>{concertDescription?.address}</div>
                {concertDescription?.link &&
                    <a href={concertDescription.link as string}
                       className={"max-w-72 underline text-red-400 hover:red-green-300 truncate"}>{concertDescription.link}</a>}
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
        {concertDescription?.records &&
            concertDescription?.records.map(({uuid, record_service}) => {

                return <div key={uuid} className={clsx("flex flex-col gap-2 w-full")}>
                    <RecordName uuid={uuid} record_service={record_service as recordService}/>
                    <Record uuid={uuid} record_service={record_service as recordService}/>
                </div>
            })
        }
    </div>);
};

