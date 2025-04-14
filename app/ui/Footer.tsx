import clsx from "clsx";
import { Suspense } from "react";
import { fetchArtistName } from "@/app/lib/data";
import { getLocale } from "next-intl/server";

const Footer = async () => {
    return (
        <footer
            className={clsx("absolute bottom-0 right-0 p-1.5")}>
            <Suspense>
                <Copyright/>
            </Suspense>
        </footer>
    );
};

const Copyright = async () => {
    const locale = await getLocale();
    const artistName = await fetchArtistName(locale);
    const owner = artistName || "";
    const year = new Date().getFullYear();

    return <p><small>{`©${year === 2024 ? year : `2024 - ${year}`} ${owner}.`}</small></p>;
};

export default Footer;