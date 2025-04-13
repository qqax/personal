import {getLocale} from "next-intl/server";
import {fetchRecords} from "@/app/lib/data";
import Record from "@/app/components/record";
import {getIntlDate} from "@/app/utils/dateFuncs";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {
    NOT_RELATED_RECORD_TYPE_STUDIO, NOT_RELATED_RECORD_TYPE_WORKSHOP, recordService,
    recordType,
    RELATED_RECORD_TYPE_CONCERT
} from "@/app/lib/schema/enums";

export default async function RecordPage() {
    const locale = await getLocale();
    const records = await fetchRecords(locale);
    console.log(records);

    return (
        <section className="w-full text-center">
            <h2 className={"text-2xl w-1/2 ml-auto py-6 text-beige sm:mb-4 lg:mb-0"}>
                <span className={"sm:hidden lg:inline"}>Records</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 sm:p-6">
                {records.map(({date, uuid, record_type, record_service}) => {
                    const intlDate = getIntlDate(locale, date as Date);

                    return (<div key={uuid} className={clsx(bgStyle, "flex flex-col gap-2 w-full p-2")}>
                        <div className={"flex w-full justify-between items-center"}>
                            <span key={intlDate} className={"text-beige"}>{intlDate}</span>)
                            <RecordType record_type={record_type as recordType}/>
                        </div>
                        <Record uuid={uuid as string} record_service={record_service as recordService}/>
                    </div>);
                })}
            </div>
        </section>
    );
}

const RecordType = ({record_type}: { record_type: recordType }) => {
    let recordTypeClass;

    switch (record_type) {
        case RELATED_RECORD_TYPE_CONCERT:
            recordTypeClass = "bg-green-700";
            break;
        case NOT_RELATED_RECORD_TYPE_STUDIO:
            recordTypeClass = "bg-blue-700";
            break;
        case NOT_RELATED_RECORD_TYPE_WORKSHOP:
            recordTypeClass = "bg-orange-700";
            break;
        default:
            recordTypeClass = "black";
    }

    return <div
        className={clsx("px-2 py-0.5 rounded-md text-amber-50", recordTypeClass)}>
        {record_type}
    </div>;
};