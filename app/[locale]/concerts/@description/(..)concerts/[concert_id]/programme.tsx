"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { EvaluateOptions } from "@mdx-js/mdx";
import { evaluate } from "@mdx-js/mdx";
import type { MDXProps } from "mdx/types";

type ReactMDXContent = (props: MDXProps) => ReactNode;
type Runtime = Pick<EvaluateOptions, "jsx" | "jsxs" | "Fragment">;

const runtime = { jsx, jsxs, Fragment } as Runtime;

export const Programme = ({ programme }: { programme: string }) => {
    const [MdxContent, setMdxContent] = useState<ReactMDXContent>(() => () => null);

    useEffect(() => {
        evaluate(programme, runtime).then(r => setMdxContent(() => r.default));
    }, [programme]);

    return <>
        <div className={"text-center text-2xl text-beige"}>Programme</div>
        <MdxContent/>
    </>;
};