import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext"; // Import the context
import ClothesSection from "../ClothesSection/ClothesSection";

function Main({
  weatherData = { temp: { F: 0, C: 0 }, type: "" },
  handleCardClick,
  onCardLike,
  updatedClothingItems,
  clothingItems = [],
  isLoggedIn, // Pass the isLoggedIn state as a prop
  currentUser,
  currentWeatherType,
}) {
  console.log("Main loaded", weatherData, currentUser, clothingItems);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter(
    (item) =>
      item.weather &&
      weatherData.type &&
      item.weather.toLowerCase() === weatherData.type.toLowerCase()
  );

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp?.C}
          ° {currentTemperatureUnit} / You may want to wear:
        </p>
      </section>
      {/* Add ClothesSection without the header */}
      <ClothesSection
        showHeader={false}
        clothingItems={filteredItems}
        onCardClick={handleCardClick}
        onCardLike={onCardLike}
        currentWeatherType={currentWeatherType}
        currentUser={currentUser} // Standardized prop name
      />
    </main>
  );
}

export default Main;
