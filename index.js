

import fetch from 'node-fetch';

import { LedMatrix } from 'rpi-led-matrix';

console.log(LedMatrix.defaultMatrixOptions);

const matrixOptions = {
    rows: 32,
    cols: 128,
    chainLength: 2,
    parallel: 1,
    showRefreshRate: false,
    hardwareMapping: 'regular', // or 'adafruit-hat'
    pwmbits: 11,
    brightness: 100,
    disableHardwarePulsing: false,
    rowAddressType: 0,
    multiplexing: 0,
    luminanceSteps: 255,
    inverseColors: false,
    ledRgbSequence: 'RGB',
    pixelMapperConfig: '',
    panelType: ''
};

const runtimeOptions = {
    gpioSlowdown: 2,
    daemon: 0, // 0 for Off, 1 for On
    dropPrivileges: 1,
    doGpioInit: true
};

(async () => {
  try {
    
    const matrix = LedMatrix(matrixOptions, runtimeOptions);

    // Set an initial display color
    matrix.Fill(255, 0, 0); // Fills the matrix with Red
    matrix.update(); // Update the display to show the color

    console.log('Matrix filled with red. Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Fill with Green
    matrix.Fill(0, 255, 0);
    matrix.update();
    console.log('Matrix filled with green. Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Fill with Blue
    matrix.Fill(0, 0, 255);
    matrix.update();
    console.log('Matrix filled with blue. Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Clear the screen
    matrix.Clear();
    matrix.update();
    console.log('Matrix cleared.');

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