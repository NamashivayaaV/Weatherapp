import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "43fcacb34548897ad75d713ab38aedc8"; 

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
            setWeatherData(response.data);
      setError(null); // Reset error state if successful
    } catch (error) {
      setError("Unable to fetch weather data. Please check the city name and try again.");
      setWeatherData(null); // Reset weather data if there's an error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}</p>
        </div>
      )}
    </div>
  );
};

function Header() {
  return (
    <header>
      <h1>Weather App</h1>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Weather />
    </div>
  );
}

export default App;
