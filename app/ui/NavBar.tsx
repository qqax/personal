import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {fetchArtistName, fetchArtistProfession} from "@/app/db/data";
import Navigation from "@/app/components/navigation";
import {LocaleSwitcher} from "@/app/ui/Select";
import {getLocale} from "next-intl/server";

const NavBar = async () => {
    const locale = await getLocale();
    const artistName = await fetchArtistName(locale);
    const artistProfession = await fetchArtistProfession(locale);
    return (
        <nav className={clsx("flex flex-row justify-around items-center z-10 border-b-red-600 border-b-4", bgStyle)}>
            <div className={"flex"}>
                <Navigation/>
                <LocaleSwitcher/>
            </div>

            <div className={"py-1.5"}>
                <h1 className={"text-3xl text-beige"}>{artistName}</h1>
                <small className={"text-lg text-beige"}>{artistProfession}</small>
            </div>
        </nav>
    )
}

export default NavBar;