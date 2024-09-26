import { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country, weatherMapApiKey }) => {
  const [weather, setWeather] = useState(null);
  const countryName = country.name.common;
  const capitalName = country.capital[0];
  const area = country.area;
  const languages = Object.values(country.languages);

  const flags = country.flags;
  const lat = country.latlng[0];
  const lon = country.latlng[1];

  const fetchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherMapApiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  useEffect(() => {
    fetchWeather();
  }, [lat, lon, weatherMapApiKey]);

  return (
    <div>
      <h1>{countryName}</h1>
      <div>capital: {capitalName}</div>
      <div>area: {area}</div>

      <div>
        <p>
          <strong>languages:</strong>
        </p>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>

      <div>
        <img
          src={flags.png}
          alt={flags.alt}
          style={{ width: '150px', height: 'auto' }}
        />
      </div>
      <div>
        <h2>Weather in {capitalName}</h2>
        {weather ? (
          <div>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              style={{ width: '100px', height: '100px' }}
            />
            <p>Wind speed: {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather information...</p>
        )}
      </div>
    </div>
  );
};

export default Country;
