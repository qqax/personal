'use client'

import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import './Calendar.css';
import Link from "next/link";

function ConcertsCalendar() {
    const [value, onChange] = useState(new Date());

    return (
        <Calendar
            defaultDate={new Date(Date.now())}
            onChange={onChange}
            value={value}
            // tileClassName={({date, view}) => {
            //     if (view !== "month") return;
            //
            //     return schedule
            //         .map(({date}) => new Date(date).setHours(0, 0, 0, 0))
            //         .includes(date.setHours(0, 0, 0, 0)) && 'react-calendar__tile--highlight'
            // }}
            className={"w-full h-[391px] p-4"}/>
    );
}

const Concerts = () => {
    const [oncoming, setOncoming] = useState(true);
    const [firstUpcomingDate, setFirstUpcomingDate] = useState("");

    useEffect(() => {}, [firstUpcomingDate])

    const onClick = () => setOncoming(!oncoming);

    return (
        <div className={clsx("p-10 border-[1px] border-green-600", bgStyle)}>
            <div className={"flex text-4xl justify-between mb-4"}>
                <h2 className={"text-center"}>Concerts:</h2>
                <Link href={"#August 13, 2024"} onClick={onClick}
                      className={clsx("transition duration-100", {"text-beige underline": oncoming})}>upcoming</Link>/
                <Link href={"#August 13, 2024"} onClick={onClick}
                      className={clsx("transition duration-100", {"text-beige underline": !oncoming})}>forgoing</Link>
            </div>
            <div className={"flex"}>
                <article>
                    <ConcertsCalendar/>
                </article>
               <Schedule firstUpcomingDate={firstUpcomingDate} setFirstUpcomingDate={setFirstUpcomingDate}></Schedule>
            </div>
        </div>

    );
};

const schedule = [
    {
        date: "2024-08-01T16:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2024-08-18T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2024-08-24T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2024-08-10T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2024-08-13T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2024-07-13T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2024-08-24T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2021-01-01T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
    {
        date: "2021-01-01T00:00:00.000Z",
        place: "Bishkek, Roerich museum",
        cords: "",
        description: "Bishkek, Roerich museum",
        program: "Mendelssohn"
    },
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const Schedule = ({firstUpcomingDate, setFirstUpcomingDate}: {firstUpcomingDate: string, setFirstUpcomingDate: React.Dispatch<React.SetStateAction<string>>} ) => {
    return (
        <article className={"flex flex-col gap-2 overflow-auto h-96 w-72 divide-y-[1px] divide-gray-400"}>

            {schedule.map((concert) => {
                const dateTime = new Date(concert.date);
                const date = Intl.DateTimeFormat(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }).format(dateTime);
                const time = Intl.DateTimeFormat(undefined, {
                    hour: "numeric",
                    minute: "2-digit"
                }).format(dateTime);

                if (!firstUpcomingDate && dateTime > new Date()) {
                    setFirstUpcomingDate(concert.date);
                }

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

export default Concerts;