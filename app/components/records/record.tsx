import { RECORD_SERVICES_YOUTUBE, type recordService } from "@/app/lib/schema/enums";

const Record = ({ uuid, record_service }: { uuid: string, record_service: recordService }) => {
    let url: string;

    switch (record_service) {
        case RECORD_SERVICES_YOUTUBE:
            url = `https://www.youtube.com/embed/${uuid}`;
            break;
        default:
            throw new Error(`Unknown record service: ${record_service}`);
    }

    return (<div className={"relative overflow-hidden w-full pt-[56.25%]"}>
        <iframe src={url}
                className={"absolute top-0 left-0 right-0 bottom-0 w-full h-full"}
                allowFullScreen/>
    </div>);
};

export default Record;