import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../ItemCard/ItemCard.css";
import heartIcon from "../../assets/heartlike.svg";
import heartIconActive from "../../assets/blackLikeHeart.svg";

function ItemCard({ item, onCardClick, currentUser,onCardLike, currentWeatherType }) {
 
  const isLiked = item.likes.includes(currentUser._id); // Check if the current user has liked the item

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item); // Use onCardLike for the like functionality
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
          <button className={itemLikeButtonClassName} onClick={handleLike}>
            <img
              src={isLiked ? heartIconActive : heartIcon}
              alt="Like"
              className="item-card__like-icon"
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
