import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Navigation from "@/app/components/navbar/navigation";
import {LocaleSwitcher} from "@/app/components/navbar/localeSwitcher";
import Artist from "@/app/components/navbar/artist";

const NavBar = () => {
    const navClassName = "flex justify-center pb-6 pt-1 hover:bg-white hover:bg-opacity-2c0 transition duration-100";
    return (
        <nav className={clsx("flex flex-row h-[88px] justify-around items-center z-10 border-b-red-600 border-b-4", bgStyle)}>
            <div className={"flex items-end h-full"}>
                    <Navigation className={clsx("w-24", navClassName)}/>
                    <LocaleSwitcher className={clsx("w-16 appearance-none", navClassName)}/>
            </div>
            <Artist/>
        </nav>
    )
}

export default NavBar;