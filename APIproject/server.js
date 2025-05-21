const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Get OpenWeather API key from environment variables
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// API route to get weather by city
app.get('/api/weather/city/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather by city:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ message: 'City not found or API error' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// API route to get weather by coordinates
app.get('/api/weather/coords', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ message: 'Invalid coordinates or API error' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// API route to get forecast
app.get('/api/forecast', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ message: 'Error fetching forecast data' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});