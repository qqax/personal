import {getLocale} from "next-intl/server";
import {fetchArtistName, fetchArtistProfession} from "@/app/db/data";
import Social from "@/app/components/social";

export default async function Artist () {
    const locale = await getLocale();
    const artistName = await fetchArtistName(locale);
    const artistProfession = await fetchArtistProfession(locale);
    return (<div className={"flex flex-col h-full justify-center"}>
        <h1 className={"text-3xl text-beige"}>{artistName}</h1>
        <div className={"flex justify-between items-center"}>
            <small className={"text-lg text-beige"}>{artistProfession}</small>
            <Social className={"w-14"}/>
        </div>
    </div>)
}