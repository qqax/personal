import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { fetchConcerts } from "@/app/lib/data";
import ConcertPage from "@/app/[locale]/concerts/concertPage";
import { RenderBoundary } from "@/app/components/renderBoundary";

const ConcertsSection = async ({ children, description }: {
    children: ReactNode,
    description: ReactNode,
}) => {
    const locale = await getLocale();
    const concerts = await fetchConcerts(locale);

    return (
        <RenderBoundary>
            <ConcertPage concerts={concerts} description={description}>
                {children}
            </ConcertPage>
        </RenderBoundary>
    );
};

export default ConcertsSection;