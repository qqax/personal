import {ReactNode} from "react";
import {getLocale} from "next-intl/server";
import {fetchConcerts} from "@/app/db/data";
import ConcertPage from "@/app/[locale]/concerts/concertPage";

const ConcertsSection = async ({children, description}: { children: ReactNode, description: ReactNode }) => {
    const locale = await getLocale();
    const {concerts, firstUpcomingConcertIndex} = await fetchConcerts(locale);
    return (
        <ConcertPage concerts={concerts} firstUpcomingConcertIndex={firstUpcomingConcertIndex} description={description}>
            {children}
        </ConcertPage>
    );
};

export default ConcertsSection;