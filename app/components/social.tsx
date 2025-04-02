import Link from "next/link";
import Image from "next/image";
import {fetchSocial} from "@/app/lib/data";
import clsx from "clsx";


const Social = async ({className}: { className?: string }) => {
    const socialLinks = await fetchSocial();

    return (
        <div className={clsx("flex items-center gap-4", className)}>
            {socialLinks?.map((link) => (
                <Link key={link.alt} href={link.href}>
                    <Image
                        src={link.src}
                        alt={link.alt}
                    />
                </Link>
            ))}
        </div>
    );
};

export default Social;
