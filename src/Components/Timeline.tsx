import React, { ReactElement } from "react";

interface Props {
    progress: number;
}

export default function Timeline({progress}: Props): ReactElement {

    return <div className={'timeline'}>
        <div className={'timelineDot'} style={{left: progress + '%'}}/>
    </div>;
}