import React, {useState} from 'react';
import TemperatureInput from './TemperatureInput';

function toCelsius(f) {
    return ((f-32) * 5) / 9;
}

function toFahrenheit(c) {
    return (c * 9) / 5 + 32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) return "";
    const output = convert(input);
    const rounded = Math.round(output * 1000) /1000;
    return String(rounded);
}

export default function TemperatureCalculator(){
    const [temperature, setTemperature] = useState("");
    const [scale, setScale] = useState("c");

    function handleCelsiusChange(value){
        setScale("c");
        setTemperature(value);
    }

    function handleFahrenheitChange(value){
        setScale("f");
        setTemperature(value);
    }


    const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return(
        <div>
            <TemperatureInput
            scale="c"
            value={celsius}
            onChange={handleCelsiusChange}
            />

            <TemperatureInput
            scale="f"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            />
        </div>
    );
}
