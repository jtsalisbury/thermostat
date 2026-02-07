import {
    LedMatrix,
    GpioMapping,
    LedMatrixUtils,
    PixelMapperType,
} from 'rpi-led-matrix';

import fetch from 'node-fetch';

const matrix = null;

const setupMatrix = () => {


matrix = new LedMatrix(
    {
        ...LedMatrix.defaultMatrixOptions,
        rows: 32,
        cols: 64,
        chainLength: 2,
        hardwareMapping: GpioMapping.AdafruitHatPwm,
        pixelMapperConfig: LedMatrixUtils.encodeMappers({
            type: PixelMapperType.U,
        }),
    },
    {
        ...LedMatrix.defaultRuntimeOptions,
        gpioSlowdown: 1,
    }
);
}

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
    console.log(trains);
}


const start = () => {
    //setupMatrix();
    
    setInterval(() => {
        renderData();
    }, 4000);
}


(() => {
    start();
})();