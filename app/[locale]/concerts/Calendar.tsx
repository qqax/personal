'use client'

import React, {useState} from "react";
import Calendar from "react-calendar";

export function ConcertsCalendar() {
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