'use client'

import {useState} from "react";
import {Modal} from "@/app/ui/Modal";
import Calendar from "react-calendar";

export const ConcertMenu = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    return (<>
        <Modal show={!showCalendar}>
            <Calendar/>
        </Modal>
        <div
            className={"fixed xl:hidden top-[88px] flex justify-around w-full z-10 bg-green-900 bg-opacity-40 backdrop-blur-sm"}>
            <button type={"button"} onClick={() => setShowCalendar(!showCalendar)} className={"px-2 py-1 bg-white bg-opacity-10 hover:bg-opacity-20"}>Calendar
            </button>
            <button type={"button"} className={"px-2 py-1 bg-white bg-opacity-10 hover:bg-opacity-20"}>Upcoming
            </button>
            <button type={"button"} className={"px-2 py-1 bg-white bg-opacity-10 hover:bg-opacity-20"}>Forgoing
            </button>
        </div>
    </>)
}