import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {Suspense} from "react";
import {fetchArtistName} from "@/app/db/data";
import {getLocale} from "next-intl/server";

const Footer = async () => {
    return (
        <footer
            className={clsx("absolute bottom-0 w-full h-20 flex items-center justify-center border-red-600 border-t-4", bgStyle)}>
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