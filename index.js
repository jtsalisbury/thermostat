

import fetch from 'node-fetch';

import { Font, LedMatrix } from 'rpi-led-matrix';

const wait = (t) => new Promise(ok => setTimeout(ok, t));

// Configuration for your specific matrix (adjust as needed)
const matrixOptions = {
    ...LedMatrix.defaultMatrixOptions(),
    rows: 32,
    cols: 64,
    chainLength: 2,
    parallel: 1,
    hardwareMapping: 'regular', // or 'regular'
};

const runtimeOptions = {
    ...LedMatrix.defaultRuntimeOptions(),
    gpioSlowdown: 2, // Required for slower Pis
};

const matrix = new LedMatrix(matrixOptions, runtimeOptions);

const font = new Font("default", "./5x7.bdf");

const getArrivalData = async () => {
    try {
        const response = await fetch('https://train-arrivals-6c5c64469c48.herokuapp.com/v1/arrivals');
        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Fetch error:', error);

        return null;
    }
}

const renderData = async () => {
    const data = await getArrivalData();

    if (data == null) {
        return;
    }

    if (data.trains == null || data.trains.length === 0) {
        showNoTrains();
    } else {

        if (data.trains.length > 3) {
            renderArrivalTimes(data.trains.slice(0, 3));
        } else {
            renderArrivalTimes(data.trains);
        }

    }
}

const getColor = (train) => {
    if (train.train_type == "J" || train.train_type == "Z") {
        return 0xA52A2A

    } else if (train.train_type == "M") {
        return 0xFF6320;
    }
}

const showNoTrains = () => {

}

const renderArrivalTimes = (trains) => {
    console.log(trains[0]);
        
        matrix
      .clear()
      .brightness(100)
      .font(font)
      .fgColor(getColor(trains[0]))
      .drawText(trains[0].train_type + " - " + trains[0].which_is_in + " min", 0, 0)
      .sync();
}


const start = () => {
    setInterval(() => {
        renderData();
    }, 4000);
}


(() => {
    start();
})();