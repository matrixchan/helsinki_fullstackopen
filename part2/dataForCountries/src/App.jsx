import { useEffect, useState } from 'react';
import axios from 'axios';
import FindCounries from './components/FindCountries';
import ShowCountries from './components/ShowCountries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const weatherMapApiKey = import.meta.env
    .VITE_API_URL_OPEN_WEATHER_MAP_API_KEY;

  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((respone) => {
        if (respone.data.length) setCountries(respone.data);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
  };

  useEffect(fetchCountries, []);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const matchCountries = () => {
    if (filterText === '') return [];

    const countriesToShow = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(filterText.toLowerCase());
    });

    return countriesToShow;
  };

  const handleShowCountry = (countryName) => {
    if (selectedCountry === countryName) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(countryName);
    }
  };

  return (
    <>
      <FindCounries
        filterText={filterText}
        handleFilterChange={handleFilterChange}
      />
      <ShowCountries
        countries={matchCountries()}
        selectedCountry={selectedCountry}
        onShowCountry={handleShowCountry}
        filterText={filterText}
        weatherMapApiKey={weatherMapApiKey}
      />
    </>
  );
}

export default App;
