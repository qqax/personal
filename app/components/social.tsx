import Link from "next/link";
import Image from "next/image";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";

const socialLinks = [
    {href: "#", src: facebookIcon, alt: "Follow Alexander Kudryavtsev on Facebook"},
    {href: "#", src: youtubeIcon, alt: "Follow Alexander Kudryavtsev on Youtube"},
]

const Social = () => {
    return (
        <div className={"flex items-center gap-4"}>
            {socialLinks.map((link) => (
                <Link key={link.alt} href={link.href}>
                    <Image
                        src={link.src}
                        alt={link.alt}
                    />
                </Link>
            ))}
        </div>
    )
}

export default Social;
