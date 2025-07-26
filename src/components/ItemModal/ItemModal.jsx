import ReactDOM from "react-dom";
import "./ItemModal.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, handleDeleteCard }) {
  if (activeModal !== "preview") return null;
  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser?._id; // Check if the current user owns the item
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return ReactDOM.createPortal(
    <div
      className={`item-modal ${
        activeModal === "preview" ? "item-modal_opened" : ""
      }`}
    >
      <div className="item-modal__overlay" onClick={onClose}></div>
      <div className="item-modal__content">
        <button onClick={onClose} type="button" className="item-modal__close">
          &times;
        </button>
        <img
          className="item-modal__image"
          src={card.imageUrl}
          alt={card.name}
        />
        <div className="item-modal__footer">
          <div className="item-modal__header">
            <h2 className="item-modal__caption">{card.name}</h2>

            {isOwn && (
              <button
                className={itemDeleteButtonClassName}
                onClick={() => handleDeleteCard(card)}
              >
                Delete Item
              </button>
            )}
          </div>
          <p className="item-modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure this exists in your HTML
  );
}

export default ItemModal;
