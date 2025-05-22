import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.OPENWEATHER_API_KEY;


//backend endpoint for geocoding
app.get('/api/geocode', async (req, res) => {
  const {city,zip} = req.query;

  try {
    let url = '';
    if (city) {
      url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    } else if (zip) {
      url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`;
    } else {
      return res.status(400).json({ error: 'City or zip required' });
    }

    const response = await axios.get(url);
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch geocoding data' });
  }
});

// 🟦 Weather route
app.get('/api/weather', async (req, res) => {
  const { city, lat, lon } = req.query;
  console.log(city,lat,lon);
  try {
    let url = '';
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ error: 'City or lat/lon required' });
    }

    const response = await axios.get(url);console.log(response.data);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// 🟩 Forecast route
app.get('/api/forecast', async (req, res) => {
  const { city, lat, lon } = req.query;
  try {
    let url = '';
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ error: 'City or lat/lon required' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// 🟥 Air pollution route (ONLY uses lat/lon)
app.get('/api/air', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude required' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
