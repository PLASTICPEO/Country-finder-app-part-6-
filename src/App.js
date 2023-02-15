import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// I know that using an index on a key is a bad choice, but in this case I allowed myself

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [seachValue, setSearchValue] = useState("");
  const [city, setCity] = useState("london");
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setCountriesData(response.data);
    });
  }, [seachValue]);

  const allCountries = countriesData.filter((countriesName) => {
    return countriesName.name.common
      .toLowerCase()
      .includes(seachValue.toLowerCase());
  });

  useEffect(() => {
    const apiKey = "187062190f4345e494a724abe5c720b3";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response);
      });
  }, [city]);

  useEffect(() => {
    if (allCountries.length === 1) {
      setCity(allCountries[0].capital[0]);
    }
  }, [allCountries]);

  return (
    <div>
      <div>
        Find countries
        <input type="search" onChange={(e) => setSearchValue(e.target.value)} />
        <div>
          {seachValue
            ? allCountries.map((infoCountries, index) => {
                if (allCountries.length === 1) {
                  return (
                    <div key={index}>
                      <h2>{infoCountries.name.common}</h2>
                      <p className="boldText">
                        Capital: {infoCountries.capital[0]}
                      </p>
                      <p className="boldText">area: {infoCountries.area}</p>
                      <div className="boldText">
                        Language:
                        <ul>
                          {Object.values(infoCountries.languages).map(
                            (language, index) => {
                              return <li key={index}>{language}</li>;
                            }
                          )}
                        </ul>
                        <img src={allCountries[0].flags.png} alt="icons" />
                        <h1>Weather</h1>
                        <p>
                          Temperature{" "}
                          {(
                            ((weatherData.data.main.temp - 32) * 5) /
                            9
                          ).toFixed(1)}{" "}
                          Celsius
                        </p>
                        <img
                          src={`http://openweathermap.org/img/w/${weatherData.data.weather[0].icon}.png`}
                          alt="weather icon"
                        />
                        <p>Wind {weatherData.data.wind.speed} m/s</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      {infoCountries.name.common}
                      <button
                        onClick={() => {
                          setCountriesData([infoCountries]);
                        }}
                      >
                        Show
                      </button>
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default App;
