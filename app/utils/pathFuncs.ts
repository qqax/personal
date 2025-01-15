import {QueryParams} from "next-intl/navigation";
import {NavigateOptions} from "next/dist/shared/lib/app-router-context.shared-runtime";

type Router = {
    push: (href: (string | { pathname: string, query?: QueryParams }), options?: ((Partial<NavigateOptions> & {
        locale?: string
    }) | undefined)) => void,
}

export const replaceDynamicSegmentIfExists = (router: Router, fullPath: string, staticPath: string, segment: string) => {
    const regExp = new RegExp(String.raw`(${staticPath}).*$`, "g");
    const newPath = fullPath.replace(regExp, '$1') + "/" + segment;

    if (newPath !== fullPath) {
        router.push({pathname: newPath});
    }
}