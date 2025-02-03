import {getLocale} from "next-intl/server";
import {fetchRecords} from "@/app/db/data";
import Video from "@/app/components/Video";
import {getIntlDate} from "@/app/utils/dateFuncs";
import clsx from "clsx";

export default async function RecordPage() {
    const locale = await getLocale();
    const records = await fetchRecords(locale);

    return (
        <section className="w-full text-center">
            <h2 className={"text-2xl text-beige"}>
                Records
            </h2>
            <div className="grid grid-cols-3 gap-2 mt-4">
                {records.map(({date, link, title, description, record_type}, i) => {
                    const intlDates = date?.sort((date1, date2) => date1.getTime() - date2.getTime())
                        .map((d) => getIntlDate(locale, d));

                    return (<div key={`${title}-${i}`} className={"flex flex-col gap-2 w-full bg-black p-2"}>
                        <div className={"flex w-full justify-between items-center"}>
                            {intlDates?.map((date) =>
                                <span key={date} className={"text-beige"}>{date}</span>)}
                            <RecordType record_type={record_type as string}/>
                        </div>
                        <Video link={link as string} title={title as string}/>
                        {title}
                    </div>);
                })}
            </div>
        </section>
    );
}

const RecordType = ({record_type}: { record_type: string }) => {
    return <div
        className={clsx(
            "px-2 py-0.5 rounded-md",
            record_type === "live"
                ? "bg-green-900"
                : record_type === "cd"
                    ? "bg-blue-900"
                    : "bg-orange-900")}>
        {record_type}
    </div>;
};