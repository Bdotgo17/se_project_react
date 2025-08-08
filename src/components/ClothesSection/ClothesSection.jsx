import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  showHeader = true,
  clothingItems = [],
  onCardClick,
  onAddItemClick,
  onAddGarmentClick,
}) {
  console.log("Rendering ClothesSection with showHeader:", showHeader); // Debug log

  const currentUser = useContext(CurrentUserContext);

  console.log("clothingItems:", clothingItems); // Debug log
  console.log("currentUser:", currentUser); // Debug log

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  console.log("userClothingItems:", userClothingItems);

  return (
    <div className="clothes-section">
      {showHeader && ( // Conditionally render the header
        <div className="clothes-section__header">
          <h2 className="clothes-section__title">Your Items</h2>
          <button
            className="clothes-section__add-button"
            onClick={onAddGarmentClick}
          >
            + Add new
          </button>
        </div>
      )}
      <ul className="clothes-section__list">
        {userClothingItems.length > 0 ? (
          userClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p className="clothes-section__empty">No items to display.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
