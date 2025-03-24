import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
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
    setLoading(true);
    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=61e11tf2503b89498d076obf6bbaf870&units=imperial`;

    axios.get(url).then((response) => {
      setTemperature(response.data.temperature.current);
      setHumidity(response.data.temperature.humidity);
      setWind(response.data.wind.speed);
      setDescription(response.data.condition.description);
      setIcon(response.data.condition.icon_url);
    });
  }

  let form = (
    <form onSubmit={handleSearch}>
      <input type="Search" placeholder="Type a City" onChange={updateCity} className="search" autoFocus="on"/>
      <input type="Submit" value="Search" className="searchB"/>
    </form>
  );

  if (loading) {
    return (
      <div>
        {form}
        <ul className="form">
          <li>{city}</li>
          <li>Temperature: {Math.round(temperature)}°F</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}% </li>
          <li>Wind: {Math.round(wind)} mph</li>
          <li>
            {" "}
            <img src={icon} alt={description} />{" "}
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
