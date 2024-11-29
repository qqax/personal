import React from "react";
import {Concerts} from "@/app/db/definitions";

export const ConcertsList = async ({schedule}: {
    firstUpcomingDate: Date,
    schedule: Concerts
}) => {

    return (
        <article className={"flex flex-col gap-2 overflow-auto h-96 w-72 divide-y-[1px] divide-gray-400"}>
            {schedule.map((concert) => {
                const date = Intl.DateTimeFormat(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }).format(concert.date as Date);
                const time = Intl.DateTimeFormat(undefined, {
                    hour: "numeric",
                    minute: "2-digit"
                }).format(concert.date as Date);

                return (
                    <div key={date} id={date} className={"p-2"}>
                        <div className={"flex justify-between"}>
                            <div>
                                {date}
                            </div>
                            <div>
                                {time}
                            </div>
                        </div>
                        <div>
                            {concert.place}
                        </div>
                        <div>
                            {concert.description}
                        </div>
                    </div>
                )
            })}
        </article>
    )
}