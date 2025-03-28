const Video = ({uuid}: { uuid: string }) => {
    const url = `https://www.youtube.com/embed/${uuid}`
    return (<div className={"relative overflow-hidden w-full pt-[56.25%]"}>
        <iframe src={url}
                className={"absolute top-0 left-0 right-0 bottom-0 w-full h-full"}
                allowFullScreen/>
    </div>);
};

export default Video;