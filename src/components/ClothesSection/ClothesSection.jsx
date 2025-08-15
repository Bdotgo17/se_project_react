import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  showHeader = false,
  clothingItems = [],
  onCardClick,
  onAddItemClick,
  currentWeatherType,
  onAddGarmentClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  console.log("Clothing items:", clothingItems);

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
        {filteredClothingItems.length > 0 ? (
          filteredClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p className="clothes-section__empty">
            No items to display for the current weather.
          </p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
