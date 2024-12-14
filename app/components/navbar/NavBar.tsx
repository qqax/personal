import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Navigation from "@/app/components/navbar/navigation";
import {LocaleSwitcher} from "@/app/components/navbar/localeSwitcher";
import Artist from "@/app/components/navbar/artist";

const NavBar = () => {
    return (
        <nav className={clsx("flex flex-row h-[88px] justify-around items-center z-10 border-b-red-600 border-b-4", bgStyle)}>
            <div className={"flex items-end h-full"}>
                    <Navigation/>
                    <LocaleSwitcher/>
            </div>
            <Artist/>
        </nav>
    )
}

export default NavBar;