import { readTemperature } from "./temperature.js";
import fs from 'fs';

const SETTINGS_FILE = 'settings.json';
const DATA_PREFIX = '_temp.json';

const date = new Date();
const month = date.toLocaleString('default', { month: 'long' });

const dataPath = month + DATA_PREFIX;

let currentData = [];
if (fs.existsSync(dataPath)) {
    currentData = JSON.parse(fs.readFileSync(dataPath));
}

let intervalId;
const enableThermostat = () => {
    intervalId = setInterval(() => {
        const data = readTemperature();
        const now = new Date();

        currentData.push({
            date: now,
            temp: data
        });

        fs.writeFileSync(dataPath, JSON.stringify(currentData));

    }, 60 * 1000);
}

const disableThermostat = () => {
    clearInterval(intervalId);
}

enableThermostat();