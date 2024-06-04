import i2c from 'i2c-bus';

const ADDR = 0x40;
const TEMP_REG = 0xE3;

const isLinux = (process.platform === 'linux');

const toCelsius = (buf) => {
    let data16 = (buf[0] << 8) | (buf[1] & 0xFC);
    let temp = (-46.85 + (175.72 * data16 / 65536));
    return temp;
};

export let readTemperature = () => {
    const i2c1 = i2c.openSync(1);
    const rbuf = Buffer.alloc(2);
    const wbuf = Buffer.from([TEMP_REG]);

    i2c1.i2cWriteSync(ADDR, wbuf.length, wbuf);
    i2c1.i2cReadSync(ADDR, rbuf.length, rbuf);

    console.log(rbuf);

    const temp = toCelsius(rbuf);
    i2c1.closeSync();

    return temp;
}
