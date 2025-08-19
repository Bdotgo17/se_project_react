import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../ItemCard/ItemCard.css";
import heartIcon from "../../assets/heartlike.svg";
import heartIconActive from "../../assets/blackLikeHeart.svg";

function ItemCard({
  item,
  onCardClick,
  currentUser,
  onCardLike = () => {},
  currentWeatherType,
}) {
  console.log("ItemCard props:", { item, currentWeatherType, currentUser });

  const isLiked = item.likes?.includes(currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (typeof onCardLike === "function") {
      onCardLike(item);
    }
  };

  // Create a variable for the like button's class
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  // Only render the card if the item's weather matches the current weather type
  if (
    !item.weather ||
    !currentWeatherType ||
    item.weather.toLowerCase() !== currentWeatherType.toLowerCase()
  ) {
    return null; // Do not render the card if it doesn't match the weather
  }

  return (
    <li className="card">
      <div className="card__header-container">
        <div className="card__header-box">
          <h2 className="card__name">{item.name}</h2>
        </div>
        {currentUser && ( // Hide the like button for unauthorized users
          <button
            className={itemLikeButtonClassName}
            onClick={() => onCardLike(item)}
          >
            <img
              className="item-card__like-icon"
              src={isLiked ? heartIconActive : heartIcon}
              alt="Like"
            />
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150"; // Use a fallback image URL
          e.target.onerror = null; // Prevent infinite loop if fallback also fails
        }}
      />
      <div className="card__info"></div>
    </li>
  );
}

export default ItemCard;
