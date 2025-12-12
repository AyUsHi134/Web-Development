import React from "react";

const scaleNames = {c:"Celsius", f: "fahrenheit"};

export default function TemperatureInput({scale,value,onChange}) {
    function handleInput(e) {
        onChange(e.target.value);
    }

    return(
        <div>
            <label>
                {scaleNames[scale]}:<input value={value} onChange={handleInput} />
            </label>
        </div>
    );
}