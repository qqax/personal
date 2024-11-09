import {copyright} from "valid-copyright";

const Footer = () => {
    return (
        <footer className="w-full h-20 flex items-center justify-center bg-black bg-opacity-50">
            <p><small>{copyright(2024, {owner: "Alexander Kudryavtsev"})}</small></p>
        </footer>
    )
}

export default Footer;