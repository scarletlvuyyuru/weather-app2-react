import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

const cityCorrections = {
  "lisboa": "lisbon",
  "newyork": "new york",
  "la": "los angeles",
  "sf": "san francisco",

};
function getCorrectCity(city) {
  return cityCorrections[city.toLowerCase()] || city;
}
export default function Search({ setWeatherData}) {
  const [city, setCity] = useState("");
  

  function updateCity(event) {
    setCity(event.target.value);
  }


  function handleSearch(event) {
    event.preventDefault();
    fetchTemperature();
  }
function fetchTemperature() {
    if (!city.trim()) return; 
   

    const correctedCity = getCorrectCity(city);
    const url = `https://api.shecodes.io/weather/v1/current?query=${correctedCity}&key=61e11tf2503b89498d076obf6bbaf870&units=imperial`;

  axios.get(url).then((response) => {
  const data = response.data;

  const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${data.coordinates.longitude}&lat=${data.coordinates.latitude}&key=61e11tf2503b89498d076obf6bbaf870&units=imperial`;

  axios.get(forecastUrl).then((forecastResponse) => {
    const forecast = forecastResponse.data.daily.slice(0, 5);

    setWeatherData({
      city: data.city,
      temperature: Math.round(data.temperature.current),
      humidity: data.temperature.humidity,
      wind: Math.round(data.wind.speed),
      description: data.condition.description,
      imgUrl: data.condition.icon_url,
      date: new Date(data.time * 1000).toLocaleString(),
      forecast: forecast, // 👈 add forecast here
    });

    setCity("");
  });
})
.catch(() => {
  alert("City not found. Please try again.");
});
}

  

 
    return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="search"
        placeholder="Type a City"
        onChange={updateCity}
        value={city}
        className="search-input"
        autoFocus="on"
      />
      <input type="submit" value="Search" className="search-button" />
    </form>
  );
}