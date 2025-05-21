import React, { useState } from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import CityCard from './components/CityCard';
import ForecastCard from './components/ForecastCard';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('city'); // 'city' or 'coords'
  
  // Replace with your actual API key
  const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
  
  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found or API error');
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // Optionally fetch forecast data as well
      fetchForecast(data.coord.lat, data.coord.lon);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Invalid coordinates or API error');
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // Optionally fetch forecast data as well
      fetchForecast(lat, lon);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch 5-day forecast
  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error fetching forecast data');
      }
      
      const data = await response.json();
      setForecastData(data);
    } catch (err) {
      console.error('Forecast error:', err);
      // Don't set error state here to not override main weather results
      setForecastData(null);
    }
  };
  
  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSearchType('coords');
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          setError("Unable to retrieve your location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{
      backgroundImage: 'url(/assets/backgrounds/main-bg.jpg)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Header onLocationClick={getCurrentLocation} />
      
      <main className="container mx-auto p-4 flex-grow">
        <WeatherCard
          onCitySearch={fetchWeatherByCity}
          onCoordinatesSearch={fetchWeatherByCoords}
          loading={loading}
          error={error}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        
        {weatherData && !loading && (
          <div className="mt-6">
            <CityCard weatherData={weatherData} />
          </div>
        )}
        
        {forecastData && !loading && (
          <div className="mt-6">
            <ForecastCard forecast={forecastData} />
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        <p>Powered by OpenWeather API</p>
      </footer>
    </div>
  );
}

export default App;