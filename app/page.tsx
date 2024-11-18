import Image from "next/image";
import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Social from "@/app/components/social";
import NewsForm from "@/app/components/newsForm";

export default function Home() {
    return (
        <main
            className={clsx("flex flex-row gap-8 max-w-[60rem] p-10 justify-center border-[1px] border-blue-700", bgStyle)}>
            <div className="w-2/3 flex flex-col gap-4 text-lg leading-tight">
                <h2 className={"text-3xl text-beige"}>Biography</h2>
                <p>
                    Alexander was born on July 31, 1987 in Moscow, Russia.
                </p>
                <p>
                    He studied in Prof. T. Zelikman's piano class at the Gnessin School and afterwards at the
                    Gnessin
                    Academy. Later he taught at the Gnessin Academy (2016 — 2022). Now he works as a teacher at the
                    Kyrgyz
                    National Conservatory named K. Maldybasanov.
                </p>
                <p>
                    Alexander toured Italy, Germany, the Netherlands, the Czech Republic, France, and Russia as a
                    pianist.
                    Repeatedly performed solo and played with the orchestra in various halls of Moscow, including
                    the
                    Great
                    Hall of the Moscow Conservatory. Have records on the radio and CDs.
                </p>
                <p>
                    Alexander is the winner of many competitions. Among them is the 1st prize in the radio
                    competition
                    "Concertino Prague" (2003), the 1st prize and the medal of the President of Italy of the 4th
                    international
                    competition of the association "Dino Ciani" (Verbania, Italy, 2005), the winner of the 1st prize
                    of
                    the
                    1st Stanislav Neuhaus International Piano Competition (2007).
                </p>
            </div>

            <div className={"flex flex-col w-96 h-full gap-8"}>
                <Image
                    src="/portrait.jpg"
                    alt="Alexander Kudryavtsev"
                    width={1177}
                    height={1772}
                    priority
                />
                <NewsForm/>
                <Social/>
            </div>
        </main>
    );
}
