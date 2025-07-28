import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../ItemCard/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Create a variable for the like button's class
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__info">
        {currentUser && ( // Hide the like button for unauthorized users
          <button className={itemLikeButtonClassName} onClick={handleLike}>
            Like
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
