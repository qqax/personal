import type { QueryParams } from "next-intl/navigation";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Router = {
    push: (href: (string | { pathname: string, query?: QueryParams }), options?: ((Partial<NavigateOptions> & {
        locale?: string
    }) | undefined)) => void,
}

export const deleteLastSegmentIfExists = (fullPath: string, staticPath: string) => {
    const regExp = new RegExp(String.raw`(${staticPath}).*$`, "g");
    return fullPath.replace(regExp, '$1');
};

export const replaceDynamicSegmentIfExists = (router: Router, fullPath: string, staticPath: string, segment: string) => {
    const newPath = deleteLastSegmentIfExists(fullPath, staticPath) + "/" + segment;

    if (newPath !== fullPath) {
        router.push({ pathname: newPath });
    }
};