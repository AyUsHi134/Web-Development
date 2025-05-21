// components/WeatherCard.jsx
import React from 'react';

const WeatherCard = ({ data }) => (
  <div className="card">
    <h2>{data.city}</h2>
    <p>{data.description}</p>
    <img
      src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
      alt={data.description}
    />
    <h3>{data.temp}°C</h3>
  </div>
);

export default WeatherCard;
