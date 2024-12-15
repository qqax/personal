import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Navigation from "@/app/components/navbar/navigation";
import Artist from "@/app/components/navbar/artist";

const NavBar = () => {
    return (
        <nav
            className={clsx("flex relative flex-row h-[88px] justify-between md:justify-around z-10 border-b-red-600 border-b-4", bgStyle)}>
            <Navigation/>
            <Artist/>
        </nav>
    )
}

export default NavBar;