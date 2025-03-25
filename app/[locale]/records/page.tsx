import {getLocale} from "next-intl/server";
import {fetchRecords} from "@/app/db/data";
import Video from "@/app/components/Video";
import {getIntlDate} from "@/app/utils/dateFuncs";
import clsx from "clsx";

export default async function RecordPage() {
    const locale = await getLocale();
    const records = await fetchRecords();

    return (
        <section className="w-full text-center">
            <h2 className={"text-2xl text-beige"}>
                Records
            </h2>
            <div className="grid grid-cols-3 gap-2 mt-4">
                {records.map(({date, uuid, record_type}) => {
                    const intlDates = date?.sort((date1, date2) => date1.getTime() - date2.getTime())
                        .map((d) => getIntlDate(locale, d));

                    return (<div key={uuid} className={"flex flex-col gap-2 w-full bg-black p-2"}>
                        <div className={"flex w-full justify-between items-center"}>
                            {intlDates?.map((date) =>
                                <span key={date} className={"text-beige"}>{date}</span>)}
                            <RecordType record_type={record_type as string}/>
                        </div>
                        <Video uuid={uuid as string}/>
                    </div>);
                })}
            </div>
        </section>
    );
}

const RecordType = ({record_type}: { record_type: string }) => {
    let recordTypeClass;

    switch (record_type) {
        case "live":
            recordTypeClass = "bg-green-900";
            break;
        case "cd":
            recordTypeClass = "bg-blue-900";
            break;
        case "self_made":
            recordTypeClass = "bg-orange-900";
    }

    return <div
        className={clsx("px-2 py-0.5 rounded-md", recordTypeClass)}>
        {record_type}
    </div>;
};