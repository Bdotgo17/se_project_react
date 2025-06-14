import "./WeatherCard.css";
import sunny from "../../assets/sunny.svg";

function WeatherCard({ temperature }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temperature} &deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
