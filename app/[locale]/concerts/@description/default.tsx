import { DefaultPage } from "@/app/[locale]/concerts/@description/defaultPage";
import { RenderBoundary } from "@/app/components/renderBoundary";

export default function Default() {
    return (
        <RenderBoundary>
            <DefaultPage/>
        </RenderBoundary>
    );
};