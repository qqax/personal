import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import {fetchArtistName} from "@/app/db/data";
import {Suspense} from "react";
import Navigation from "@/app/components/navigation";

const ArtistName = async () => {
    const name = await fetchArtistName();
    return <h1 className={"text-3xl flex text-beige"}>{name}</h1>
}

const NavBar = () => {
    return (
        <nav className={clsx("flex flex-row justify-around items-center z-10 border-b-red-600 border-b-4", bgStyle)}>
            <div className={"flex"}>
                <Navigation/>
            </div>
            <Suspense fallback={null}>
                <ArtistName />
            </Suspense>
        </nav>
    )
}

export default NavBar;