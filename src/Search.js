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
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(null);

  function updateCity(event) {
    setCity(event.target.value);
  }


  function handleSearch(event) {
    event.preventDefault();
    fetchTemperature();
  }
function fetchTemperature() {
    if (!city.trim()) return; 
    setLoading(true);

    const correctedCity = getCorrectCity(city);
    const url = `https://api.shecodes.io/weather/v1/current?query=${correctedCity}&key=61e11tf2503b89498d076obf6bbaf870&units=imperial`;

  axios.get(url).then((response) => {
    const data = response.data;
    setWeatherData({
      city: data.city,
      temperature: Math.round(data.temperature.current),
      humidity: data.temperature.humidity,
      wind: Math.round(data.wind.speed),
      description: data.condition.description,
      imgUrl: data.condition.icon_url,
      date: new Date(data.time * 1000).toLocaleString(),
    });
    setCity("");
    setLoading(false);
  })
  .catch(() => {
        alert("City not found. Please try again.");
        setLoading(false);
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