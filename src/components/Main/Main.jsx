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
}) {
  console.log("clothingItems in Main:", clothingItems);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext); // Access the current unit

  const filteredItems = Array.isArray(updatedClothingItems)
    ? updatedClothingItems.filter(
        (item) =>
          item.weather &&
          weatherData.type &&
          item.weather.toLowerCase() === weatherData.type.toLowerCase()
      )
    : [];

  console.log("Filtered items:", filteredItems); // Debug log
  console.log("Weather data type:", weatherData.type); // Debug log
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike} // Pass the onCardLike function to ItemCard
                currentWeatherType={weatherData.type} // Pass the current weather type
              />
            ))
          ) : (
            <p className="cards__empty-message">
              No items match the current weather.
            </p>
          )}
        </ul>
      </section>
      {/* Add ClothesSection without the header */}
      <ClothesSection
        showHeader={false} // Hide the header
        clothingItems={clothingItems} // Pass the clothing items for this section
        onCardClick={handleCardClick} // Handle card clicks
        onAddGarmentClick={() => {}} // Optional: No need for adding garments here
      />
    </main>
  );
}

export default Main;
