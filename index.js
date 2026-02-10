

import fetch from 'node-fetch';

import { LedMatrix } from 'rpi-led-matrix';

const wait = (t) => new Promise(ok => setTimeout(ok, t));

(async () => {
  try {
    // Configuration for your specific matrix (adjust as needed)
    const matrixOptions = {
        ...LedMatrix.defaultMatrixOptions(),
        rows: 32,
        cols: 128,
        chainLength: 2,
        hardwareMapping: 'regular', // or 'regular'
    };

    const runtimeOptions = {
        ...LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 2, // Required for slower Pis
    };
    
    const matrix = new LedMatrix(matrixOptions, runtimeOptions);
    matrix
    .clear() // clear the display
    .brightness(100) // set the panel brightness to 100%
    .fgColor(0x0000ff) // set the active color to blue
    .fill() // color the entire diplay blue
    .fgColor(0xffff00) // set the active color to yellow
    // draw a yellow circle around the display
    .drawCircle(
      matrix.width() / 2,
      matrix.height() / 2,
      matrix.width() / 2 - 1
    )
    // draw a yellow rectangle
    .drawRect(
      matrix.width() / 4,
      matrix.height() / 4,
      matrix.width() / 2,
      matrix.height() / 2
    )
    // sets the active color to red
    .fgColor({ r: 255, g: 0, b: 0 })
    // draw two diagonal red lines connecting the corners
    .drawLine(0, 0, matrix.width(), matrix.height())
    .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1);

        await wait(9999999);

  } catch (error) {
    console.error(error);
  }
})();


/*const getArrivalData = async () => {
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
    matrix
        .clear() // clear the display
        .brightness(100) // set the panel brightness to 100%
        .fgColor(0x000000) // set the active color to blue
        .fill() // color the entire diplay blue
        .fgColor(getColor(train[0])) // set the active color to yellow
        // draw a yellow circle around the display
        .drawCircle(matrix.width() / 2, matrix.height() / 2, matrix.width() / 2 - 1)
        // draw a yellow rectangle
        .drawRect(
            matrix.width() / 4,
            matrix.height() / 4,
            matrix.width() / 2,
            matrix.height() / 2
        )
        // sets the active color to red
        .fgColor({ r: 255, g: 0, b: 0 })
        // draw two diagonal red lines connecting the corners
        .drawLine(0, 0, matrix.width(), matrix.height())
        .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1)
        .sync();
}


const start = () => {
    setupMatrix();

    setInterval(() => {
        renderData();
    }, 4000);
}


(() => {
    start();
})();*/