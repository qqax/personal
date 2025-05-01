import Link from "next/link";
import Image from "next/image";
import { fetchArtistName, fetchSocial } from "@/app/lib/data";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";
import instagramIcon from "../../public/icons/instagram.svg";
import telegramIcon from "../../public/icons/telegram.svg";
import linkedinIcon from "../../public/icons/linkedin.svg";
import twitterIcon from "../../public/icons/twitter.svg";
import patreonIcon from "../../public/icons/patreon.svg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { getLocale } from "next-intl/server";
import {
    SOCIAL_TYPE_FACEBOOK,
    SOCIAL_TYPE_INSTAGRAM,
    SOCIAL_TYPE_LINKEDIN,
    SOCIAL_TYPE_PATREON,
    SOCIAL_TYPE_TELEGRAM,
    SOCIAL_TYPE_TWITTER,
    SOCIAL_TYPE_YOUTUBE
} from "@/app/lib/schema/enums";

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
                    case SOCIAL_TYPE_INSTAGRAM:
                        alt = `Follow ${artist} on Instagram`;
                        src = instagramIcon;
                        break;
                    case SOCIAL_TYPE_TELEGRAM:
                        alt = `Follow ${artist} on Telegram`;
                        src = telegramIcon;
                        break;
                    case SOCIAL_TYPE_TWITTER:
                        alt = `Follow ${artist} on Twitter`;
                        src = twitterIcon;
                        break;
                    case SOCIAL_TYPE_LINKEDIN:
                        alt = `Follow ${artist} on LinkedIn`;
                        src = linkedinIcon;
                        break;
                    case SOCIAL_TYPE_PATREON:
                        alt = `Follow ${artist} on Patreon`;
                        src = patreonIcon;
                        break;
                    default:
                        throw new Error(`Unsupported type "${type}"`);
                }

                return (<Link key={alt} href={url} className={"w-6 nb:w-8 md:w-auto"}>
                    <Image
                        src={src}
                        alt={alt}
                        className={"w-10"}
                    />
                </Link>);
            })}
        </>
    );
};

export default Social;
