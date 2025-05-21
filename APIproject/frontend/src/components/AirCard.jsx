// components/AirCard.jsx
import React from 'react';

const AirCard = ({ data }) => (
  <div className="card">
    <h2>Air Quality</h2>
    <p>AQI: {data.main.aqi}</p>
    <p>PM2.5: {data.components.pm2_5} µg/m³</p>
    <p>PM10: {data.components.pm10} µg/m³</p>
    <p>CO: {data.components.co} µg/m³</p>
  </div>
);

export default AirCard;
