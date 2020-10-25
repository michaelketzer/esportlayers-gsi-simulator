import React, { ReactElement, useEffect, useRef, useState } from "react";

interface Props {
    currentTs: number;
    setCurrentTs: (ts: number) => void;
}

const interval = 100;


export function useInterval(callback: Function) {
    const savedCallback = useRef<Function>();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }

        let id = setInterval(tick, interval);
        return () => clearInterval(id);
    }, []);
}

export default function Runner({currentTs, setCurrentTs}: Props): ReactElement {
    const [play, setPlay] = useState(false);

    useInterval(() => {
        play && setCurrentTs(currentTs + interval);
    })

    return <div className={'runner'}>
        <div className={'runnerButton ' + (play ? '' : 'play')} onClick={() => setPlay(!play)}>
            {!play && <svg xmlns="http://www.w3.org/2000/svg"  width={40} viewBox="0 0 448 512"><path fill="#24d46a" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" ></path></svg>}
            {play && <svg xmlns="http://www.w3.org/2000/svg" width={40} viewBox="0 0 448 512"><path fill="rgb(212 36 81)" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path></svg>}
        </div>
    </div>
}