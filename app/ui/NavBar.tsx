import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {fetchArtistName} from "@/app/db/data";
import Navigation from "@/app/components/navigation";
import Select from "@/app/ui/Select";
import {useLocale} from "next-intl";

const NavBar = async () => {
    const locale = useLocale();
    const artistName = await fetchArtistName(locale);
    return (
        <nav className={clsx("flex flex-row justify-around items-center z-10 border-b-red-600 border-b-4", bgStyle)}>
            <div className={"flex"}>
                <Navigation/>
            </div>
            <Select/>
            <h1 className={"text-3xl flex text-beige"}>{artistName}</h1>
        </nav>
    )
}

export default NavBar;