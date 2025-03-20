import React from "react";
import Forecast from "./Forecast";



import './App.css';

function App() {
  return (
    <div className="App">
    
      <header className="App-header">
       
        <h1>
          Weather App
        
        </h1>
      
      </header>
      
       <div className="App">
      
     
      <Forecast />
     </div>
     </div>
  );
}

export default App;
