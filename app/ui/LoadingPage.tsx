import "@/app/ui/Loader.css"
import React from "react";

export default async function LoadingPage() {
    return <div className={"flex w-full h-screen justify-center items-center"}>
        <span className="loader w-1/3"></span>
    </div>
}