import React, { ReactElement, useMemo } from "react";
import { GsiEvent } from "../App";

interface Props {
    currentTs: number
    data: GsiEvent[];
}

function tsToDuration(timeSpan: number): string {
    const totalSeconds = timeSpan / 1000;
    const min = Math.floor(totalSeconds / 60);
    let sec: number | string = Math.floor(totalSeconds % 60);
    sec = sec < 10 ? '0' + sec : sec;

    return `${min}:${sec}`;
}

export default function Details({currentTs, data}: Props): ReactElement {
    const timeSpan = useMemo(() => data.length > 0 ? data[data.length - 1].ts - data[0].ts : 0, [data]);
    const duration = useMemo(() => tsToDuration(timeSpan), [timeSpan]);
    const currentDur = useMemo(() => tsToDuration(currentTs - (data[0]?.ts || 0)), [data, currentTs]);
    
    return <div className={'details'}>
        <div className={'events'}>{data.length} Events</div>
        <div className={'timeDuration'}>{currentDur}&nbsp;/&nbsp;{duration}</div>
    </div>;
}