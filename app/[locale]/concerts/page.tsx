// import clsx from "clsx";
// import {bgStyle} from "@/app/ui/styles";
// import './Calendar.css';
// import {ConcertsCalendar} from "@/app/[locale]/concerts/Calendar";
// import ConcertsList from "@/app/[locale]/concerts/concertsList";
// import {fetchConcerts} from "@/app/db/data";
// import {getLocale} from "next-intl/server";
// import NewsForm from "@/app/components/forms/newsForm";
//
// const ConcertsSection = async () => {
//     const locale = await getLocale();
//     const {concerts, firstUpcomingConcertIndex} = await fetchConcerts(locale);
//
//     return (
//         <div className={clsx("p-10 border-[1px] border-green-600", bgStyle)}>
//             <div className={"flex gap-4"}>
//                 <div>
//                     <ConcertsCalendar/>
//                     <NewsForm buttonClassName={"bg-green-700 hover:bg-green-600"}/>
//                 </div>
//                     <ConcertsList concerts={concerts} firstUpcomingConcertIndex={firstUpcomingConcertIndex}/>
//             </div>
//         </div>
//     );
// };
//
// export default ConcertsSection;

export default function ConcertPage  () {
    return null;
};