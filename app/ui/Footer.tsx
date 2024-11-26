import {copyright} from "valid-copyright";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {connection} from 'next/server'
import {Suspense} from "react";
import {fetchArtistName} from "@/app/db/data";

const Footer = async () => {
    return (
        <footer className={clsx("absolute bottom-0 w-full h-20 flex items-center justify-center", bgStyle)}>
            <Suspense>
                <Copyright/>
            </Suspense>
        </footer>
    )
}

const Copyright = async () => {
    const artistName = await fetchArtistName();
    const owner = artistName || "";

    await connection();

    return <p><small>{copyright(2024, {owner})}</small></p>
}

export default Footer;