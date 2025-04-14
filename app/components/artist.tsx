import { getLocale } from "next-intl/server";
import { fetchArtistName, fetchArtistProfession } from "@/app/lib/data";

export default async function Artist() {
    const locale = await getLocale();
    const artistName = await fetchArtistName(locale);
    const artistProfession = await fetchArtistProfession(locale);

    return (<div>
        <h1 className={"text-2xl nb:text-3xl sm:text-4xl text-beige nb:mb-3"}>{artistName}</h1>
        <p><small className={"text-beige text-base nb:text-xl"}>{artistProfession}</small></p>
    </div>);
}