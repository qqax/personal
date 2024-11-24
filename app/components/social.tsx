import Link from "next/link";
import Image from "next/image";
import {fetchSocial} from "@/app/db/data";


const Social = async () => {
    const socialLinks = await fetchSocial();

    return (
        <div className={"flex items-center gap-4"}>
            {socialLinks?.map((link) => (
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
