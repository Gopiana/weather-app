import React, { useEffect, useState } from 'react';
import './App.css';

/* Images */
import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import rainIcon from './assets/rain.png';
import snowIcon from './assets/snow.png';
import Weatherdetails from './WeatherDetails';

function App() {
  const api_key = "a8a7468b695fc8cd365415129287f406";
  const [text, setText] = useState("Chennai");

  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    setError(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text},in&appid=${api_key}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);

      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="cityInput"
          placeholder="Search City"
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="Search" style={{ height: "25px", width: "25px" }} />
        </div>
      </div>

      {loading && <div className="loading-message">Loading..</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotFound && <div className="city-not-found">City not found</div>}

      {!loading && !cityNotFound && (
        <Weatherdetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          lon={lon}
          humidity={humidity}
          wind={wind}
        />
      )}
    </div>
  );
}

export default App;
