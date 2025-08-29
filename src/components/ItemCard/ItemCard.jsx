import React, { useContext, useState } from "react"; // <-- Add useState
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../ItemCard/ItemCard.css";
import heartIcon from "../../assets/heartlike.svg";
import heartIconActive from "../../assets/blackLikeHeart.svg";
import ConfirmDeleteModal from "../ConfirmationModal/ConfirmationModal";
import ItemModal from "../ItemModal/ItemModal";

function ItemCard({
  onDelete,
  item,
  onCardClick,
  currentUser,
  onCardLike = () => {},
  currentWeatherType,
  isLoggedIn,
}) {
  console.log("ItemCard onDelete prop:", onDelete); // <-- Place here

  const isLiked = item.likes?.includes(currentUser?._id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => setIsModalOpen(true);

  const handleLike = () => {
    if (typeof onCardLike === "function") {
      onCardLike(item);
    }
  };

  // Create a variable for the like button's class
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  const [showConfirm, setShowConfirm] = useState(false);
  const handleDeleteClick = () => setShowConfirm(true);
  const handleClose = () => setShowConfirm(false);
  const handleConfirm = () => {
    onDelete();
    setShowConfirm(false);
  };

  return (
    <>
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
        />
        <div className="card__info"></div>

        {/* ...your card JSX... */}
        {/* <button onClick={handleDeleteClick}>Delete</button> */}
      </li>

      <ItemModal
        isOpen={isModalOpen}
        activeModal="preview"
        onClose={() => setIsModalOpen(false)}
        card={item}
        isLoggedIn={true}
        onDelete={() => onDelete(item)} // <-- Pass the card object!
        currentUser={currentUser}
      />
    </>
  );
}

export default ItemCard;
