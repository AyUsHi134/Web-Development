import React from 'react';
import '../styles/index.css';

const AirCard = ({ data }) => {
  const aqi = data.list[0].main.aqi;
  const quality = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

  return (
    <div className="card">
      <h2>Air Quality</h2>
      <p>AQI Index: {aqi} ({quality[aqi - 1]})</p>
    </div>
  );
};

export default AirCard;
