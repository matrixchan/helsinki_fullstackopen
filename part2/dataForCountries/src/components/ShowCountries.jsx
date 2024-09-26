import Country from './Country';

const ShowCountries = ({
  countries,
  selectedCountry,
  onShowCountry,
  filterText,
  weatherMapApiKey,
}) => {
  if (filterText && countries.length === 0) {
    return <div>No matches found</div>;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={() => onShowCountry(country.name.common)}>
            {selectedCountry === country.name.common ? 'hide' : 'show'}
          </button>
          {selectedCountry === country.name.common && (
            <Country country={country} weatherMapApiKey={weatherMapApiKey} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowCountries;
