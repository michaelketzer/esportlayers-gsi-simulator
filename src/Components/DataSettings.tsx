import React, { ReactElement, useEffect, useState } from "react";
import { GsiEvent } from "../App";
import fs from 'fs';

interface Props {
    data: GsiEvent[];
    currentTs: number;
}

async function sendEvents(events: GsiEvent[], auth: string, url: string): Promise<void> {
    for(const {fullPath} of events) {
        const rawFileData = await fs.promises.readFile(fullPath, 'utf8');
        const body = JSON.parse(rawFileData);
        //@ts-ignore
        body.auth.token = auth;
        fetch(url, {body: JSON.stringify(body), method: 'POST', headers: {'Content-Type': 'application/json'},});
    }
}


export default function DataSettings({currentTs, data}: Props): ReactElement {
    const [url, setUrl] = useState('http://localhost/dota-gsi');
    const [auth, setAuth] = useState('2a177126-953b-45d7-a5bb-044e6243d4aa');
    const [lastTs, setLastTs] = useState(currentTs);

    useEffect(() => {
        const relevantStamps = data.filter(({ts}) => ts > lastTs && ts < currentTs);
        if(relevantStamps && relevantStamps.length > 0) {
            sendEvents(relevantStamps, auth, url);
        }
        
        setLastTs(currentTs);
    }, [currentTs, data])


    return <div className={'dataInputs'}>
        <label>
            <input type={'url'} className={'input'} placeholder={'GSI Server URL'} value={url} onChange={(e) => setUrl(e.target.value)}/>
        </label>

        <label>
            <input type={'string'} className={'input'} placeholder={'Auth key'} value={auth} onChange={(e) => setAuth(e.target.value)} />
        </label>
    </div>
}