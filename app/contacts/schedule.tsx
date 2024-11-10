// 'use server'
//
// import React from "react";
//
// const schedule = [
//     {
//         date: "2024-08-01T16:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2024-08-18T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2024-08-24T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2024-08-10T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2024-08-13T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2024-07-13T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2024-08-24T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2021-01-01T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
//     {
//         date: "2021-01-01T00:00:00.000Z",
//         place: "Bishkek, Roerich museum",
//         cords: "",
//         description: "Bishkek, Roerich museum",
//         program: "Mendelssohn"
//     },
// ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//
// const Schedule = ({firstUpcomingDate, setFirstUpcomingDate}: {firstUpcomingDate: string, setFirstUpcomingDate: React.Dispatch<React.SetStateAction<string>>} ) => {
//     return (
//         <article className={"flex flex-col gap-2 overflow-auto h-96 w-72 divide-y-[1px] divide-gray-400"}>
//
//             {schedule.map((concert) => {
//                 const dateTime = new Date(concert.date);
//                 const date = Intl.DateTimeFormat(undefined, {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric"
//                 }).format(dateTime);
//                 const time = Intl.DateTimeFormat(undefined, {
//                     hour: "numeric",
//                     minute: "2-digit"
//                 }).format(dateTime);
//
//                 if (!firstUpcomingDate && dateTime > new Date()) {
//                     setFirstUpcomingDate(concert.date);
//                 }
//
//                 return (
//                     <div key={date} id={date} className={"p-2"}>
//                         <div className={"flex justify-between"}>
//                             <div>
//                                 {date}
//                             </div>
//                             <div>
//                                 {time}
//                             </div>
//                         </div>
//                         <div>
//                             {concert.place}
//                         </div>
//                         <div>
//                             {concert.description}
//                         </div>
//                     </div>
//                 )
//             })}
//         </article>
//     )
// }
//
// export default Schedule;