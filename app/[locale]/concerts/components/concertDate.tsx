import {useLocale} from "next-intl";

export const ConcertDate = ({dateTime}: {dateTime: Date}) => {
    const locale = useLocale();
    const date = Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }).format(dateTime);
    const time = Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC"
    }).format(dateTime);

    return <div className={"flex w-full gap-2 justify-between"}>
        <div>
            {date}
        </div>
        <div>
            {time}
        </div>
    </div>
}