import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext"; // Import the context
import App from "../App/App"; // Adjust the relative path as needed

function Main({
  weatherData = { temp: { F: 0, C: 0 }, type: "" },
  handleCardClick,
  onCardLike,
  clothingItems = [],
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext); // Access the current unit
  console.log("Clothing items:", clothingItems); // Debug log
  console.log("Weather data type:", weatherData.type); // Debug log

  const filteredItems = Array.isArray(clothingItems)
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : [];

  return (
    <main>
      <WeatherCard temperature={weatherData.temp} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}{" "}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.length > 0
            ? filteredItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike} // Pass the onCardLike function to ItemCard
                />
              ))
            : null}
        </ul>
      </section>
    </main>
  );
}

export default Main;
