import {paths} from "@/app/components/navbar/navigation";
import {getLastSegment} from "@/app/utils/pathFuncs";

type ConcertPathFn = (concertID: string) => void;

export const pathWithConcertIDHandler = (path: string, fn: ConcertPathFn) => {
    if (!path.endsWith(paths.concerts)) {
        getLastSegment(path)
        const id = getLastSegment(path);
        fn(id);
    }
}