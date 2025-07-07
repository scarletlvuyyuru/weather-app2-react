import React, { useEffect, useState, useRef } from "react";
import Forecast from "./Forecast";
import Search from "./Search";
import axios from "axios";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [units, setUnit] = useState("imperial");
 
  useEffect(() => {
    const defaultCity = "New York";
    
    
    const url = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=61e11tf2503b89498d076obf6bbaf870&units=${units}`;

    axios.get(url).then((response) => {
      const data = response.data;
      setWeatherData({
        city: data.city,
        temperature: data.temperature.current,
        humidity: data.temperature.humidity,
        wind: data.wind.speed,
        description: data.condition.description,
        imgUrl: data.condition.icon_url,
        date: new Date(data.time * 1000).toLocaleString(),
      });
      setLoading(false); 
    });
  }, []);
const videoRef = useRef(null);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.playbackRate = 0.3; 
  }
}, []);
  return (
    <div className="App">
      <header className="App-header">
  <video
   ref={videoRef}
    autoPlay
    muted
    loop
    playsInline
    className="header-video"
  >
    <source src="/header-video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="header-content">
    <h1>Weather App</h1>
  </div>
</header>

      <div className="App">
        <Search setWeatherData={setWeatherData} />

        
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          weatherData && <Forecast weatherData={weatherData} unit={units} setUnit={setUnit}/>
        )}
      </div>
    </div>
  );
}

export default App;