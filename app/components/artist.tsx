import {getLocale} from "next-intl/server";
import {fetchArtistName, fetchArtistProfession} from "@/app/lib/data";

export default async function Artist() {
    const locale = await getLocale();
    const artistName = await fetchArtistName(locale);
    const artistProfession = await fetchArtistProfession(locale);

    return (<div className={"fixed flex flex-col items-center top-32 sm:top-48 w-full lg:w-1/2"}>
        <div className={"p-4"}>
            <h1 className={"mix-blend-screen text-3xl sm:text-4xl text-beige mb-3"}>{artistName}</h1>
            <p><small className={"text-beige text-xl"}>{artistProfession}</small></p>
        </div>
    </div>);
}