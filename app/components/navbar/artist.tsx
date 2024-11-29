import {getLocale} from "next-intl/server";
import {fetchArtistName, fetchArtistProfession} from "@/app/db/data";

export default async function Artist () {
    const locale = await getLocale();
    const artistName = await fetchArtistName(locale);
    const artistProfession = await fetchArtistProfession(locale);
    return (<div className={"py-3"}>
        <h1 className={"text-3xl text-beige"}>{artistName}</h1>
        <small className={"text-lg text-beige"}>{artistProfession}</small>
    </div>)
}