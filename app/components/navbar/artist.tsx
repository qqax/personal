import {getLocale} from "next-intl/server";
import {fetchArtistName, fetchArtistProfession} from "@/app/db/data";
import Social from "@/app/components/social";

export default async function Artist() {
    const locale = await getLocale();
    const artistName = await fetchArtistName(locale);
    const artistProfession = await fetchArtistProfession(locale);

    return (<div className={"flex flex-col h-full justify-center pr-4"}>
        <h1 className={"text-lg text-end nb:text-2xl sm:text-3xl text-beige"}>{artistName}</h1>
        <div className={"flex justify-end nb:justify-between items-center"}>
            <small className={"text-beige nb:text-base sm:text-lg"}>{artistProfession}</small>
            <Social className={"hidden nb:flex w-14"}/>
        </div>
    </div>);
}