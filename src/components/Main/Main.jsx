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
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext); // Access the current unit

  const filteredItems = Array.isArray(clothingItems)
    ? clothingItems.filter(
        (item) =>
          item.weather &&
          weatherData.type &&
          item.weather.toLowerCase() === weatherData.type.toLowerCase()
      )
    : [];

  console.log("Filtered Items:", filteredItems); // Debugging log
  console.log("Weather Data:", weatherData); // Debugging log
  console.log("Current Temperature Unit:", currentTemperatureUnit); // Debugging log
  console.log("Clothing Items:", clothingItems); // Debugging log
  console.log("Is Logged In:", isLoggedIn); // Debugging log
  console.log("Updated Clothing Items:", updatedClothingItems); // Debugging log
  console.log("Current Weather Type:", weatherData.type); // Debugging log

  return (
    <main>
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}{" "}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
      </section>
      {/* Add ClothesSection without the header */}
      <ClothesSection
        showHeader={false}
        clothingItems={filteredItems}
        onCardClick={handleCardClick}
        onAddItemClick={() => {}}
        onCardLike={onCardLike}
        currentWeatherType={currentWeatherType}
        currentUser={currentUser} // Standardized prop name
      />
    </main>
  );
}

export default Main;
