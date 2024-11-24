import Image from "next/image";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Social from "@/app/components/social";
import NewsForm from "@/app/components/newsForm";
import {fetchArtistName, fetchBiography} from "@/app/db/data";
import {Suspense} from "react";
import {Biography} from "@/app/db/definitions";

const BiographyText = async () => {
    const biography: Biography = await fetchBiography();

    return <>
        {biography?.map((paragraph, index) => <p key={`bio-${index}`}>{paragraph}</p>)}
    </>
}

const ArtistImage = async () => {
    const name = await fetchArtistName();

    return (<Image
        src="/portrait.jpg"
        alt={name}
        width={1177}
        height={1772}
        priority
    />)
}

export default function Home() {
    return (
        <main
            className={clsx("flex flex-row gap-8 max-w-[60rem] p-10 justify-center border-[1px] border-blue-700", bgStyle)}>
            <div className="w-2/3 flex flex-col gap-4 text-lg leading-tight">
                <h2 className={"text-3xl text-beige"}>Biography</h2>
                <Suspense fallback={null}>
                    <BiographyText/>
                </Suspense>
            </div>

            <div className={"flex flex-col w-96 h-full gap-8"}>
                <Suspense>
                    <ArtistImage/>
                </Suspense>
                <NewsForm/>
                <Suspense>
                    <Social/>
                </Suspense>
            </div>
        </main>
    );
}
