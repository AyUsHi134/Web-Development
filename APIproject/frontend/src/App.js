import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import AirCard from './components/AirCard';
import './styles/index.css';

const App = () => {
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState({ lat: '', lon: '' });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airData, setAirData] = useState(null);

  const handleSearch = async () => {
    try {
      const weatherRes = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(weatherRes.data);

      const forecastRes = await axios.get(`http://localhost:5000/api/forecast?city=${city}`);
      setForecastData(forecastRes.data);

      setCoords({
        lat: weatherRes.data.coord.lat,
        lon: weatherRes.data.coord.lon,
      });

      const airRes = await axios.get(
        `http://localhost:5000/api/air?lat=${weatherRes.data.coord.lat}&lon=${weatherRes.data.coord.lon}`
      );
      setAirData(airRes.data);
    } catch (err) {
      alert('Error fetching data. Check city name or coordinates.');
    }
  };

  return (
    <div className="app">
      <Header />
      
      {weatherData && <WeatherCard data={weatherData} />}
      {forecastData && <ForecastCard data={forecastData} />}
      {airData && <AirCard data={airData} />}
    </div>
  );
};

export default App;
