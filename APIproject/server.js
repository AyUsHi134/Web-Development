import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Current weather by city
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Weather data not found' });
  }
});

// Forecast by city
app.get('/api/forecast', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Forecast data not found' });
  }
});

// Air pollution by lat/lon
app.get('/api/air', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Air quality data not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
