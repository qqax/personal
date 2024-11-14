import Link from "next/link";
import Image from "next/image";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";

const Social = () => {
    return (
        <div className={"flex items-center gap-2"}>
            <Link href={"#"}>
                <Image
                    src={facebookIcon}
                    alt="Follow Alexander Kudryavtsev on Facebook"
                />
            </Link>
            <Link href={"#"}>
                <Image
                    src={youtubeIcon}
                    alt="Follow Alexander Kudryavtsev on Youtube"
                />
            </Link>
        </div>
    )
}

export default Social;
