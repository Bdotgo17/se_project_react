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
        {clothingItems.map((item) => (
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
