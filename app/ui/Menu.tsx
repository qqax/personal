"use client"

import clsx from 'clsx';
import {useState} from "react";


const Key = ({keyNum}: { keyNum: number }) => {
    const [selected, setSelected] = useState(true);

    return (<div className={"relative"}>
        <button type={"button"}
                onClick={() => setSelected(!selected)}
                className={clsx(
                    "w-64 h-14 bg-amber-50 text-black pr-4 flex items-center justify-end border-[1px] border-black rounded-r-md",
                    {
                        'relative -left-3 before:content-none before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-transparent before:shadow-2xl before:shadow-amber-700 before:rotate-[10deg]': keyNum === 5,
                    }
                )}>
            Key
        </button>
        {keyNum !== 3 && keyNum !== 6 && <BlackKey keyNum={keyNum}/>}
    </div>)
}

const BlackKey = ({keyNum}: { keyNum: number }) => {
    return (<div className={clsx(
        "absolute z-10 w-32 h-9 bg-black rounded-r-md",
        {
            '-bottom-[1.3rem]': keyNum === 0 || keyNum === 4,
            '-bottom-5': keyNum === 1,
            '-bottom-[1.2rem]': keyNum === 2 || keyNum === 5,
        }
    )}/>)
}

const Keyboard = () => {
    const keys = [];
    for (let i = 0; i < 21; i++) {
        keys.push(<Key keyNum={i % 7}/>);
    }

    return (<div className={"transform -rotate-x-45 -skew-x-6"}>
        {keys.map((key) => key)}
    </div>)
}

const Menu = () => {

    return (
        <div className={"absolute top-0 left-0 perspective-600"}>
            <Keyboard/>
        </div>
    )
}

export default Menu;