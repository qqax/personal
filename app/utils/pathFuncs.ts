import {QueryParams} from "next-intl/navigation";
import {NavigateOptions} from "next/dist/shared/lib/app-router-context.shared-runtime";

type Router = {
    push: (href: (string | { pathname: string, query?: QueryParams }), options?: ((Partial<NavigateOptions> & {
        locale?: string
    }) | undefined)) => void,
}

export function getLastSegment(path: string): string {
    const segments = path.split("/");
    return segments[segments.length - 1];
}

export const replaceDynamicSegmentIfExists = (router: Router, fullPath: string, staticPath: string, segment: string) => {
    const regExp = new RegExp(String.raw`(${staticPath}).*$`, "g");
    router.push({pathname: fullPath.replace(regExp, '$1') + "/" + segment});
}