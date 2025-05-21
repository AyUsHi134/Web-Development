import React from 'react';
import '../styles/index.css';

const ForecastCard = ({ data }) => {
  return (
    <div className="card">
      <h2>5 Day Forecast</h2>
      <div className="forecast-list">
        {data.list.slice(0, 5).map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{item.dt_txt}</p>
            <p>Temp: {item.main.temp}°C</p>
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
