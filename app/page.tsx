import Image from "next/image";
import {copyright} from "valid-copyright";
import Menu from "@/app/ui/Menu";

export default function Home() {
  return (
    <div>
      <main className="relative flex p-8 sm:p-20 pb-20 flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/portrait.jpg"
          alt="Alexander Kudryavtsev"
          width={428}
          height={725}
          priority
        />
          <Menu/>
      </main>
      <footer className="w-full h-20 flex items-center justify-center">
          <p>{copyright(2024, {owner: "Alexander Kudryavtsev"})}</p>
      </footer>
    </div>
  );
}
