import Image from "next/image";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Social from "@/app/components/social";
import NewsForm from "@/app/components/forms/newsForm";
import {fetchArtistName, fetchBiography} from "@/app/db/data";
import {getLocale} from "next-intl/server";
import {MDXRemote} from "next-mdx-remote/rsc";

export default async function Home() {
    const locale = await getLocale();
    const name = await fetchArtistName(locale);
    const biography = await fetchBiography(locale);

    return (
        <main
            className={clsx("flex flex-col gap-8 max-w-[60rem] p-2 nb:p-6 sm:p-10 justify-center md:border-[1px] border-white", bgStyle)}>
            <div>
                <Image
                    src="/portrait.jpg"
                    alt={name || "artist_photo"}
                    width={1177}
                    height={1772}
                    className={"sm:float-right sm:w-1/2 sm:pl-4 pb-8"}
                    priority
                />
                <h2 className={"text-3xl text-beige mb-8"}>Biography</h2>
                <div className={"prose text-gray-200 text-lg leading-tight"}>
                    <MDXRemote source={biography}/>
                </div>
            </div>
            <div className={"flex flex-col sm:flex-row w-full h-full gap-8"}>
                <div className={"sm:w-1/2"}>
                    <NewsForm buttonClassName={"bg-red-600 hover:bg-red-500 text-white disabled:bg-red-500"}/>
                </div>
                <Social/>
            </div>
        </main>
    );
}
