import React, { useContext } from "react"; // Import useContext from React
import "./WeatherCard.css";
import sunny from "../../assets/sunny.svg";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ temperature }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F" ? temperature.F : temperature.C} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
