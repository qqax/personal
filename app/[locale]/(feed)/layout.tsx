import React from "react";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<div className={"bg-amber-50 w-full min-h-screen"}>{children}</div>)
}