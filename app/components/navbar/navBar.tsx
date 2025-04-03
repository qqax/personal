import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Navigation from "@/app/components/navbar/navigation";
import Artist from "@/app/components/navbar/artist";

const NavBar = () => {
    return (
        <nav
            className={clsx("fixed top-0 left-0 flex flex-row w-full h-[88px] justify-between md:justify-around z-40", bgStyle)}>
            <Navigation/>
            <Artist/>
        </nav>
    );
};

export default NavBar;