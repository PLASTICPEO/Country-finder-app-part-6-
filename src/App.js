import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [seachValue, setSearchValue] = useState("");
  const [fleg, setFleg] = useState("");

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const allCountries = countries.filter((countriesName) => {
    return countriesName.name.common.toLowerCase().includes(seachValue);
  });

  useEffect(() => {
    if (allCountries.length === 1) {
      console.log(allCountries);
      setFleg(allCountries[0].flags.png);
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
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <p key={index}>
                      {item.name.common}
                      <button>Show</button>
                    </p>
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
