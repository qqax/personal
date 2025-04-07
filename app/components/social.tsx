import Link from "next/link";
import Image from "next/image";
import {fetchSocial} from "@/app/lib/data";

const Social = async () => {
    const socialLinks = await fetchSocial();

    return (
        <>
            {socialLinks?.map((link) => (
                <Link key={link.alt} href={link.href}>
                    <Image
                        src={link.src}
                        alt={link.alt}
                    />
                </Link>
            ))}
        </>
    );
};

export default Social;
