import { useLocale } from "next-intl";
import { getIntlDate, getIntlTime } from "@/app/utils/dateFuncs";

export const ConcertDate = ({ dateTime }: { dateTime: Date }) => {
    const locale = useLocale();
    const date = getIntlDate(locale, dateTime);
    const time = getIntlTime(locale, dateTime);

    return <div className={"flex w-full flex-col sm:flex-row sm:gap-8 justify-between text-beige"}>
        <div>
            {date}
        </div>
        <div>
            {time}
        </div>
    </div>;
};