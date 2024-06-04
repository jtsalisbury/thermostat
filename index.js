import i2c from 'i2c-bus';

const ADDR = 0x40;
const TEMP_REG = 0xE3;

export const readTemperature = () => {
    const i2c1 = i2c.openSync(1);
    const rawData = i2c1.readWordSync(ADDR, TEMP_REG);
    console.log(rawData);

    const temp = ((175.72 * rawData) / 65536.0) - 46.85
    console.log(temp);

    i2c1.closeSync();

    return rawData;
}
const data = readTemperature();

console.log(data);