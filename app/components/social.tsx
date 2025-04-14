import Link from "next/link";
import Image from "next/image";
import { fetchArtistName, fetchSocial } from "@/app/lib/data";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { getLocale } from "next-intl/server";
import { SOCIAL_TYPE_FACEBOOK, SOCIAL_TYPE_YOUTUBE } from "@/app/lib/schema/enums";

const Social = async () => {
    const socialLinks = await fetchSocial();
    const locale = await getLocale();
    const artist = await fetchArtistName(locale);

    return (
        <>
            {socialLinks?.map(({ type, url }) => {
                let alt: string;
                let src: string | StaticImport;
                switch (type) {
                    case SOCIAL_TYPE_FACEBOOK:
                        alt = `Follow ${artist} on Facebook`;
                        src = facebookIcon;
                        break;
                    case SOCIAL_TYPE_YOUTUBE:
                        alt = `Follow ${artist} on Youtube`;
                        src = youtubeIcon;
                        break;
                    default:
                        throw new Error(`Unsupported type "${type}"`);
                }

                return (<Link key={alt} href={url} className={"w-6 nb:w-8 md:w-auto"}>
                    <Image
                        src={src}
                        alt={alt}
                    />
                </Link>)
            })}
        </>
    );
};

export default Social;
