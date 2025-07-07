import React from "react";
import Search from "./Search";
import './Forecast.css';



export default function Forecast({weatherData}) {
      const [isCelsius, setIsCelsius] = React.useState(true);

    const convertTemperature = () => {
        setIsCelsius(!isCelsius);
    };

    const temperature = isCelsius 
        ? Math.round((weatherData.temperature - 32) * 5/9) 
  : Math.round(weatherData.temperature); 

        return (
  <div className="Weather fade-in">
    <div>
      <h2 className="city-display">{weatherData.city}</h2>
       <img
    src={weatherData.imgUrl}
    alt={weatherData.description}
    className="weatherIcon"
  />
      <span className="displayCurrentTemp">
        <strong>{temperature}</strong>
        <span className="units">
          <a
  href="/"
  onClick={(e) => {
    e.preventDefault();
    if (!isCelsius) convertTemperature(); 
  }}
  className={isCelsius ? "active" : ""}
>
  °C
</a>{" "}
|{" "}
<a
  href="/"
  onClick={(e) => {
    e.preventDefault();
    if (isCelsius) convertTemperature(); 
  }}
  className={!isCelsius ? "active" : ""}
>
  °F
</a>
        </span>
      </span>
    </div>

    <div>
      <ul className="items">
        <li>Humidity: {weatherData.humidity}%</li>
        <li>Wind: {Math.round(weatherData.wind)} km/h</li>
      </ul>
    </div>

    <div className="flex-container">
      {[...Array(6)].map((_, i) => (
        <div className="col" key={i}>
          DoW
          <ul className="items">
            <li>Temperature</li>
            <li>Icon</li>
          </ul>
        </div>
      ))}
    </div>

    <div>
      <p className="updatedDetails">Updated on {weatherData.date}</p>
    </div>

    <footer>
      <p>
        <a
          className="link"
          href="https://github.com/scarletlvuyyuru/weatherapp-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-source code
        </a>{" "}
        by Scarlet Vuyyuru, hosted on{" "}
        <a
          className="link"
          href="https://relaxed-lolly-4c1367.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlify
        </a>
      </p>
    </footer>
  </div>
);}
