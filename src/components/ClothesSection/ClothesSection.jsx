import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  showHeader,
  clothingItems,
  onCardClick,
  onCardLike,
  onAddItemClick,
  currentWeatherType,
  onAddGarmentClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Add these debug logs here:
  console.log("Current user ID:", currentUser?._id);
  console.log("All clothing items:", clothingItems);
  console.log("Current weather type:", currentWeatherType);

  const userClothingItems = clothingItems.filter(
    (item) => String(item.owner) === String(currentUser?._id)
  );

  // Further filter items based on the current weather type
  const filteredClothingItems = userClothingItems.filter(
    (item) => item.weather.toLowerCase() === currentWeatherType?.toLowerCase()
  );

  console.log("Filtered clothing items:", filteredClothingItems);

  return (
    <div className="clothes-section">
      {showHeader && ( // Conditionally render the header
        <div className="clothes-section__header">
          <h2 className="clothes-section__title">Your Items</h2>
          <button
            className="add-new-button"
            onClick={() => {
              console.log("Add New button clicked in ClothesSection");
              onAddItemClick();
            }}
          >
            + Add New
          </button>
        </div>
      )}
      <ul className="clothes-section__list">
        {filteredClothingItems.length > 0 ? (
          filteredClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike} // <-- Make sure this is a function!
              currentWeatherType={currentWeatherType}
              currentUser={currentUser}
            />
          ))
        ) : (
          <p className="clothes-section__empty"></p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
