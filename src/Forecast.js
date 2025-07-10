import React from "react";

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
  {weatherData.forecast.map((day, index) => {
    const date = new Date(day.time * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = days[date.getDay()];

    const dailyTemp = isCelsius
      ? Math.round((day.temperature.day - 32) * 5 / 9)
      : Math.round(day.temperature.day);

    return (
      <div className="col" key={index}>
        <h4>{dayName}</h4>
        <img
          src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png`}
          alt={day.condition.description}
          width="50"
        />
        <ul className="items">
          <li>{dailyTemp}°</li>
          <li>{day.condition.description}</li>
        </ul>
      </div>
    );
  })}
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
