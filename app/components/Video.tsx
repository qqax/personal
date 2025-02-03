const Video = ({title, link}: { title: string, link: string }) => {
    return (<div className={"relative overflow-hidden w-full pt-[56.25%]"}>
        <iframe src={link}
                title={title}
                className={"absolute top-0 left-0 right-0 bottom-0 w-full h-full"}
                allowFullScreen/>
    </div>);
};

export default Video;