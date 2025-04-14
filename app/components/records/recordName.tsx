'use client'

import { RECORD_SERVICES_YOUTUBE, recordService } from "@/app/lib/schema/enums";
import { useEffect, useState } from "react";

export const RecordName = ({ uuid, record_service }: { uuid: string, record_service: recordService }) => {
    let url: string;

    switch (record_service) {
        case RECORD_SERVICES_YOUTUBE:
            url = `https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${uuid}&format=json`;
            break;
        default:
            throw new Error(`Unknown record service: ${record_service}`);
    }

    return <RecordNameView url={url}/>;
}

const RecordNameView = ({ url }: { url: string }) => {
    const [data, setData] = useState<{ title: string } | null>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            }).catch(() => {
            setLoading(false);
        });
    }, [url])

    if (isLoading) return <p>Loading...</p>;
    if (!data) return null;

    return <div className={"font-bold"}>{`${data.title}`}</div>;
}