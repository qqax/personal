'use client';

import { ReactNode, useEffect, useState } from "react";

export const RenderBoundary = ({ children }: { children: ReactNode }) => {
    const [isRendered, setIsRendered] = useState(false);
    useEffect(() => {
        setIsRendered(true);
    }, []);

    return (isRendered
        ? <>{children}</>
        : null);
};