import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [seachValue, setSearchValue] = useState("");
  const [fleg, setFleg] = useState("");
  const [city, setCity] = useState("london");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setCountries(response.data);
    });
  }, [seachValue]);

  const allCountries = countries.filter((countriesName) => {
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
        setTemperature(response);
      });
  }, [city]);

  useEffect(() => {
    if (allCountries.length === 1) {
      setFleg(allCountries[0].flags.png);
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
            ? allCountries.map((item, index) => {
                if (allCountries.length === 1) {
                  return (
                    <div key={index}>
                      <h2>{item.name.common}</h2>
                      <p style={{ fontWeight: "bold" }}>
                        Capital: {item.capital[0]}
                      </p>
                      <p style={{ fontWeight: "bold" }}>area: {item.area}</p>
                      <div style={{ fontWeight: "bold" }}>
                        Language:
                        <ul>
                          {Object.values(item.languages).map(
                            (language, index) => {
                              return <li key={index}>{language}</li>;
                            }
                          )}
                        </ul>
                        <img src={fleg} alt="icons" />
                        <h1>Weather</h1>
                        <p>
                          Temperature{" "}
                          {(
                            ((temperature.data.main.temp - 32) * 5) /
                            9
                          ).toFixed(1)}{" "}
                          Celsius
                        </p>
                        <img
                          src={`http://openweathermap.org/img/w/${temperature.data.weather[0].icon}.png`}
                          alt="weather icon"
                        />
                        <p>Wind {temperature.data.wind.speed} m/s</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      {item.name.common}
                      <button
                        onClick={() => {
                          setCountries([item]);
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
