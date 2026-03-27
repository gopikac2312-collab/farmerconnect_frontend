import { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const lat = 11.259275870876722;
  const lon = 75.78398813241085;

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    if (!API_KEY) {
      setError("API Key is missing");
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch weather");
        return res.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load weather data");
      });
  }, [url, API_KEY]);

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div style={{ padding: "15px", background: "#eef6f2", borderRadius: "10px" }}>
      <h3>🌤 {weather.name}</h3>
      <p>🌡 Temperature: {weather.main.temp} °C</p>
      <p>☁ Condition: {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬 Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;