import "./ui/Loader.css"
import Background from "@/app/components/background";
import React from "react";

export default async function LoadingPage() {
    return <div className={"flex w-full h-screen bg-amber-50 bg-opacity-50 justify-center items-center"}>
        <Background/>
        <span className="loader w-1/3"></span>
    </div>
}