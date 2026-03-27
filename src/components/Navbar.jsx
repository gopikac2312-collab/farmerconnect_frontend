// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
        
//         {/* Logo */}
//         <h2 className="logo">FarmerConnect</h2>

//         {/* Menu */}
//         <ul className="nav-links">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/products">Products</Link></li>
//           <li><Link to="/orders">Orders</Link></li>
//           <li><Link to="/reviews">Reviews</Link></li>
//           <li><Link to="/about">About</Link></li>
//         </ul>

//         {/* Auth Buttons */}
//         <div className="auth-buttons">
//           <Link to="/login" className="btn login">Login</Link>
//           <Link to="/register" className="btn register">Register</Link>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import { WiDaySunny } from "react-icons/wi";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
        
//         {/* Logo */}
//         <h2 className="logo">FarmerConnect</h2>

//         {/* Menu */}
//         <ul className="nav-links">
//           <li><Link to="/home">Home</Link></li>
//           <li><Link to="/buyer-product">Products</Link></li>
//           <li><Link to="/buyer-orders">Orders</Link></li>
          
//           <li><Link to="/reviews">Reviews</Link></li>
//           <Link to="/cart" className="cart-btn">
//     🛒 Cart <span className="cart-count">2</span>
//   </Link>

//           {/* 🌦️ Weather Button */}
//           {/* <li>
//             <Link to="/weather" className="weather-link">
//               <WiDaySunny size={24} /> Weather 
//             </Link>
//           </li> */}

//           <li><Link to="/about">About Us</Link></li>
//         </ul>

//         {/* Auth Buttons */}
//         <div className="auth-buttons">
//           <Link to="/login" className="btn login">Login</Link>
//           <Link to="/register/farmer" className="btn register">Register</Link>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WiDaySunny, WiHumidity, WiStrongWind, WiRain } from "react-icons/wi";
import "../styles/Navbar.css";

const API_KEY = "d73556bd5bc9dfbe83ceeb5cfe70b125";

const getFarmingTip = (weather) => {
  const condition = weather.weather[0].main.toLowerCase();
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;

  if (condition.includes("rain") || condition.includes("drizzle"))
    return { tip: "🌧️ Rainy day — avoid spraying pesticides. Good for transplanting seedlings.", color: "#1565c0" };
  if (condition.includes("thunderstorm"))
    return { tip: "⛈️ Thunderstorm — keep farmers and livestock indoors. Avoid fieldwork.", color: "#b71c1c" };
  if (condition.includes("snow"))
    return { tip: "❄️ Frost risk — cover sensitive crops and protect irrigation pipes.", color: "#0277bd" };
  if (condition.includes("clear") && temp > 35)
    return { tip: "🥵 Very hot — water crops early morning or evening. Avoid midday fieldwork.", color: "#e65100" };
  if (condition.includes("clear") && temp >= 20)
    return { tip: "☀️ Great weather — ideal day for harvesting, spraying, and fieldwork.", color: "#2e7d32" };
  if (condition.includes("cloud") && humidity > 80)
    return { tip: "🌫️ High humidity — watch for fungal diseases on crops.", color: "#6a1b9a" };
  if (condition.includes("cloud"))
    return { tip: "⛅ Cloudy — good conditions for planting and light field operations.", color: "#37474f" };
  if (temp < 10)
    return { tip: "🥶 Cold weather — protect young plants from frost damage.", color: "#0288d1" };
  return { tip: "🌱 Moderate conditions — good day for general farming activities.", color: "#388e3c" };
};

const getWeatherIcon = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
};

const Navbar = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = () => {
    if (showPopup) {
      setShowPopup(false);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Current weather
          const currentRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const currentData = await currentRes.json();
          if (currentData.cod !== 200) throw new Error(currentData.message);

          // 5-day forecast
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const forecastData = await forecastRes.json();

          // Pick one entry per day (at noon)
          const daily = forecastData.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
          ).slice(0, 5);

          setWeather(currentData);
          setForecast(daily);
          setShowPopup(true);
        } catch (err) {
          setError("Failed to fetch weather. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please allow location.");
        setLoading(false);
        setShowPopup(true);
      }
    );
  };

  const farmingTip = weather ? getFarmingTip(weather) : null;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <h2 className="logo">FarmerConnect</h2>

        {/* Menu */}
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/buyer-product">Products</Link></li>
          <li><Link to="/buyer-orders">Orders</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <Link to="/cart" className="cart-btn">
            🛒 Cart <span className="cart-count">2</span>
          </Link>

          {/* 🌦️ Weather Button */}
          <li className="weather-nav-item">
            <button className="weather-btn" onClick={fetchWeather} disabled={loading}>
              <WiDaySunny size={24} />
              {loading ? "Loading..." : "Weather"}
            </button>

            {showPopup && (
              <div className="weather-popup">
                <button className="close-popup" onClick={() => setShowPopup(false)}>✕</button>

                {error ? (
                  <p className="weather-error">{error}</p>
                ) : weather ? (
                  <>
                    {/* Header */}
                    <div className="weather-header">
                      <img
                        src={getWeatherIcon(weather.weather[0].icon)}
                        alt={weather.weather[0].description}
                        className="weather-icon-img"
                      />
                      <div>
                        <h3 className="weather-city">📍 {weather.name}</h3>
                        <p className="weather-desc">{weather.weather[0].description}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="weather-grid">
                      <div className="weather-stat">
                        <WiDaySunny size={28} />
                        <span>{Math.round(weather.main.temp)}°C</span>
                        <small>Temp</small>
                      </div>
                      <div className="weather-stat">
                        <WiHumidity size={28} />
                        <span>{weather.main.humidity}%</span>
                        <small>Humidity</small>
                      </div>
                      <div className="weather-stat">
                        <WiStrongWind size={28} />
                        <span>{weather.wind.speed} m/s</span>
                        <small>Wind</small>
                      </div>
                      <div className="weather-stat">
                        <WiRain size={28} />
                        <span>{weather.clouds.all}%</span>
                        <small>Clouds</small>
                      </div>
                    </div>

                    <p className="weather-feels">Feels like: {Math.round(weather.main.feels_like)}°C</p>

                    {/* Farming Tip */}
                    {farmingTip && (
                      <div className="farming-tip" style={{ borderColor: farmingTip.color }}>
                        <p style={{ color: farmingTip.color }}>{farmingTip.tip}</p>
                      </div>
                    )}

                    {/* 5-Day Forecast */}
                    {forecast.length > 0 && (
                      <div className="forecast-section">
                        <h4 className="forecast-title">5-Day Forecast</h4>
                        <div className="forecast-list">
                          {forecast.map((day, i) => (
                            <div className="forecast-day" key={i}>
                              <small>{formatDay(day.dt)}</small>
                              <img
                                src={getWeatherIcon(day.weather[0].icon)}
                                alt={day.weather[0].description}
                                width={36}
                              />
                              <span>{Math.round(day.main.temp)}°C</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            )}
          </li>

          <li><Link to="/about">About Us</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/register/farmer" className="btn register">Register</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;