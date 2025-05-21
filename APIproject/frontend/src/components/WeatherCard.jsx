import React, { useState } from 'react';

const WeatherCard = ({ 
  onCitySearch, 
  onCoordinatesSearch, 
  loading, 
  error, 
  searchType, 
  setSearchType
}) => {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSearch = () => {
    if (searchType === 'city' && city.trim()) {
      onCitySearch(city.trim());
    } else if (searchType === 'coords' && latitude && longitude) {
      onCoordinatesSearch(latitude, longitude);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Search Options Tabs */}
      <div className="flex mb-4 border-b border-gray-200">
        <button 
          className={`py-2 px-4 font-medium ${searchType === 'city' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setSearchType('city')}
        >
          Search by City
        </button>
        <button 
          className={`py-2 px-4 font-medium ${searchType === 'coords' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setSearchType('coords')}
        >
          Search by Coordinates
        </button>
      </div>
      
      {/* Search Input */}
      <div className="mb-8">
        {searchType === 'city' ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city name"
              className="flex-grow px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="number" 
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Latitude"
              step="any"
              className="flex-grow px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="number" 
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Longitude"
              step="any"
              className="flex-grow px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        )}
      </div>
      
      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;