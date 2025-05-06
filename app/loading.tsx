import "./ui/loading/Loader.css";
import Background from "@/app/components/background";
import React from "react";
import Fallback from "@/app/ui/loading/Fallback.tsx";

export default async function LoadingPage() {
    return <div className={"flex w-full h-screen bg-amber-50 bg-opacity-50 justify-center items-center"}>
        <Background/>
        <Fallback/>
    </div>;
}