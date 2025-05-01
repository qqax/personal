import Image from "next/image";
import wet_meadow from "@/public/wet_meadow.jpg";

export default function Background() {
    return (
        <div className={"fixed top-0 left-0 w-full -z-40 h-screen overflow-hidden"}>
            <Image
                alt="wet_meadow"
                src={wet_meadow}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
                className={"object-cover -z-50 w-auto"}
            />
        </div>

    );
}