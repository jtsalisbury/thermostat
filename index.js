import { readTemperature } from "./temperature.js";

const isLinux = (process.platform === 'linux');


const data = isLinux ? readTemperature() : 24;

console.log(data);