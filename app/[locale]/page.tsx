import Image from "next/image";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Social from "@/app/components/social";
import NewsForm from "@/app/components/forms/newsForm";
import {fetchArtistName, fetchBiography} from "@/app/db/data";
import {Biography} from "@/app/db/definitions";

export default async function Home() {
    const name = await fetchArtistName();
    const biography: Biography = await fetchBiography();

    return (
        <main
            className={clsx("flex flex-row gap-8 max-w-[60rem] p-10 justify-center border-[1px] border-white", bgStyle)}>
            <div className="w-2/3 flex flex-col gap-4 text-lg leading-tight">
                <h2 className={"text-3xl text-beige"}>Biography</h2>
                {biography?.map((paragraph, index) => <p key={`bio-${index}`}>{paragraph}</p>)}
            </div>

            <div className={"flex flex-col w-96 h-full gap-8"}>
                <Image
                    src="/portrait.jpg"
                    alt={name || "artist_photo"}
                    width={1177}
                    height={1772}
                    priority
                />
                <NewsForm buttonClassName={"bg-red-600 hover:bg-red-500 text-white disabled:bg-red-500"}/>
                <Social/>
            </div>
        </main>
    );
}
