import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import AirCard from './components/AirCard';
import './styles/index.css';

const App = () => {
  const [inputType, setInputType] = useState('city'); // 'city' or 'coords'
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState({ lat: '', lon: '' });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airData, setAirData] = useState(null);

  const handleSearch = async () => {
    try {

      let lat, lon;

      if (inputType === 'city') {
      const weatherRes = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(weatherRes.data);

      const forecastRes = await axios.get(`http://localhost:5000/api/forecast?city=${city}`);
      setForecastData(forecastRes.data);
      
      lat = weatherRes.data.coord.lat;
        lon = weatherRes.data.coord.lon;
      } else {
        lat = coords.lat;
        lon = coords.lon;

        const weatherRes = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
        setWeatherData(weatherRes.data);

        const forecastRes = await axios.get(`http://localhost:5000/api/forecast?lat=${lat}&lon=${lon}`);
        setForecastData(forecastRes.data);
      }

      const airRes = await axios.get(`http://localhost:5000/api/air?lat=${lat}&lon=${lon}`);
      setAirData(airRes.data);
    } catch (err) {
      alert('Error fetching data. Check input values.');
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="card">
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="radio"
              value="city"
              checked={inputType === 'city'}
              onChange={() => setInputType('city')}
            />{' '}
            Enter City
          </label>{' '}
          <label>
            <input
              type="radio"
              value="coords"
              checked={inputType === 'coords'}
              onChange={() => setInputType('coords')}
            />{' '}
            Enter Latitude & Longitude
          </label>
        </div>

        {inputType === 'city' ? (
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter latitude"
              value={coords.lat}
              onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter longitude"
              value={coords.lon}
              onChange={(e) => setCoords({ ...coords, lon: e.target.value })}
            />
          </>
        )}

        <button onClick={handleSearch}>Search</button>
      </div>

      {weatherData && <WeatherCard data={weatherData} />}
      {forecastData && <ForecastCard data={forecastData} />}
      {airData && <AirCard data={airData} />}
    </div>
  );
};

export default App;

      