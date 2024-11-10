import {copyright} from "valid-copyright";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";

const Footer = () => {
    return (
        <footer className={clsx("absolute bottom-0 w-full h-20 flex items-center justify-center", bgStyle)}>
            <p><small>{copyright(2024, {owner: "Alexander Kudryavtsev"})}</small></p>
        </footer>
    )
}

export default Footer;