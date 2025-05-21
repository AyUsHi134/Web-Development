import React from 'react';

const ForecastCard = ({ forecast }) => {
  // This component would display forecast data
  // For now, it's a placeholder as it's not in the initial implementation
  // You would use this when you expand the app to show multi-day forecasts
  
  if (!forecast) return null;
  
  const getWeatherIcon = (weatherCode) => {
    // Map weather codes to your custom icon paths
    if (weatherCode >= 200 && weatherCode < 300) {
      return '/assets/icons/thunderstorm.png';
    } else if (weatherCode >= 300 && weatherCode < 600) {
      return '/assets/icons/rain.png';
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return '/assets/icons/snow.png';
    } else if (weatherCode >= 700 && weatherCode < 800) {
      return '/assets/icons/mist.png';
    } else if (weatherCode === 800) {
      return '/assets/icons/clear.png';
    } else {
      return '/assets/icons/clouds.png';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {forecast.list && forecast.list.filter((_item, idx) => idx % 8 === 0).map((day, index) => (
          <div key={index} className="bg-gray-50 p-2 rounded-lg text-center">
            <p className="text-sm text-gray-500">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img 
              src={getWeatherIcon(day.weather[0].id)} 
              alt={day.weather[0].description}
              className="w-8 h-8 mx-auto my-2" 
            />
            <p className="font-semibold">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;