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
  isLoggedIn,
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
          <button className="add-new-button" onClick={onAddItemClick}>
            + Add New
          </button>
        </div>
      )}
      <ul className="clothes-section__list">
        {filteredClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike} // <-- Make sure this is a function!
            currentWeatherType={currentWeatherType}
            currentUser={currentUser}
          />
        ))}
      </ul>
      {isLoggedIn && filteredClothingItems.length === 0 && (
        <p className="clothes-section__empty">
          No items to display for the current user.
        </p>
      )}
    </div>
  );
}

export default ClothesSection;
