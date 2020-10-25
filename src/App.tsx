import * as React from "react";
import fs from 'fs';
import './App.scss';
import { timeStamp } from "console";
const {dialog} = require('electron').remote;

interface GsiEvent {
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
    const timeSpan = gsiEvents.length > 0 ? gsiEvents[gsiEvents.length - 1].ts - gsiEvents[0].ts : 0;
    console.log(timeSpan, timeSpan / 1000, Math.floor(timeSpan / 1000 / 60) + ':' + Math.floor((timeSpan / 1000) % 60));
    return <div>
        <h1>
            EsportLayers GSI Simulator
        </h1>
    </div>
}
