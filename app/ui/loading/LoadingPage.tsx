import "@/app/ui/loading/Loader.css";
import React from "react";
import Fallback from "@/app/ui/loading/Fallback.tsx";

export default async function LoadingPage() {
    return <div className={"flex w-full h-screen justify-center items-center"}>
        <Fallback/>
    </div>;
}