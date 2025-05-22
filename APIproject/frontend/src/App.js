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
  const [zip, setZip] = useState('');
  const [coords, setCoords] = useState({ lat: '', lon: '' });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airData, setAirData] = useState(null);

  const handleSearch = async () => {
    try {

      let lat = coords.lat;
      let lon = coords.lon;

      if (inputType === 'city' && city) {
  const geoRes = await axios.get(`http://localhost:5001/api/geocode?city=${city}`);
  console.log(geoRes);
  if (geoRes.data.length === 0) throw new Error('City not found');
  lat = geoRes.data[0].lat;
  lon = geoRes.data[0].lon;
} else if (inputType === 'zip' && zip) {
  const geoRes = await axios.get(`http://localhost:5001/api/geocode?zip=${zip}`);
  lat = geoRes.data.lat;
  lon = geoRes.data.lon;
}

      if (!lat || !lon) {
        alert('Invalid coordinates or location data');
        return;
      }

      // Save coordinates
      setCoords({ lat, lon });

      // Call your backend API with lat/lon
      const weatherRes = await axios.get(`http://localhost:5001/api/weather?lat=${lat}&lon=${lon}`);
      setWeatherData(weatherRes.data);

      const forecastRes = await axios.get(`http://localhost:5001/api/forecast?lat=${lat}&lon=${lon}`);
      setForecastData(forecastRes.data);

      const airRes = await axios.get(`http://localhost:5001/api/air?lat=${lat}&lon=${lon}`);
      setAirData(airRes.data);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="input-section">
        <label>Select Input Method: </label>
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="city">City Name</option>
          <option value="zip">Zip Code</option>
          <option value="coords">Latitude & Longitude</option>
        </select>

        {inputType === 'city' && (
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        )}

        {inputType === 'zip' && (
          <input
            type="text"
            placeholder="Enter Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        )}

        {inputType === 'coords' && (
          <>
            <input
              type="text"
              placeholder="Enter Latitude"
              value={coords.lat}
              onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter Longitude"
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