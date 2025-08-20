import React, { useContext } from "react"; // Import useContext from React
import "./WeatherCard.css";
import sunny from "../../assets/sunny.svg";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData?.temp || { F: "--", C: "--" }; // fallback if temp is missing

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp?.F
          : weatherData.temp?.C}
        ° {currentTemperatureUnit}
      </p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
