import React, { useEffect, useMemo, useState } from "react";
import fs from 'fs';
import './App.scss';
import Details from "./Components/Details";
import Timeline from "./Components/Timeline";
import DataSettings from "./Components/DataSettings";
import Runner from "./Components/Runner";
const {dialog} = require('electron').remote;

export interface GsiEvent {
    fullPath: string;
    fileName: string;
    ts: number;
}

function useDotaEvents(): GsiEvent[] {
    const [files, setFiles] = React.useState<GsiEvent[]>([]);
    if(files.length === 0) {
        dialog.showOpenDialog({
            properties: ['openDirectory']
            //@ts-ignore
        }).then(({filePaths}) => {
            const path = filePaths[0];
            path && fs.readdir(path, (err, fileNames) => setFiles(fileNames.map((name) => ({
                fullPath: path + '/' + name,
                fileName: name,
                ts: +name.substring(0, name.indexOf('.')),
            }))));
        });
    }

    return files;
}

export default function App() {
    const gsiEvents = useDotaEvents();
    const [currentTs, setCurrentTs] = useState(gsiEvents.length ? gsiEvents[0].ts : 0);
    useEffect(() => setCurrentTs(gsiEvents.length ? gsiEvents[0].ts : 0), [gsiEvents])
    const progress = useMemo(() => {
        if(gsiEvents.length) {
            const min = gsiEvents[0].ts;
            const max = gsiEvents[gsiEvents.length - 1].ts;
            const total = max - min;
            const current = currentTs - min;
            return (current * 100) / total;
        }
        return 0;
    }, [gsiEvents, currentTs]);

    return <div>
        <h1>
            EsportLayers GSI Simulator
        </h1>

        <Details data={gsiEvents} currentTs={currentTs}/>
        <Timeline progress={progress} />
        <DataSettings data={gsiEvents} currentTs={currentTs} />
        <Runner currentTs={currentTs} setCurrentTs={setCurrentTs}/>
    </div>
}
