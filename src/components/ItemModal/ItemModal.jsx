import ReactDOM from "react-dom";
import "./ItemModal.css";
import React, { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ConfirmDeleteModal from "../ConfirmationModal/ConfirmationModal";

function ItemModal({
  isOpen,
  activeModal,
  onClose,
  card,
  isLoggedIn,
  onDelete,
}) {
  console.log("ItemModal onDelete prop:", onDelete);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  if (activeModal !== "preview" || !isOpen) return null;

  const isOwn = card.owner === currentUser?._id; // Check if the current user owns the item
  console.log("card.owner:", card.owner);
  console.log("currentUser._id:", currentUser?._id);
  console.log("isLoggedIn:", isLoggedIn);
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  const handleDeleteClick = () => setShowConfirm(true);
  const handleCancelDelete = () => setShowConfirm(false);
  const handleConfirmDelete = () => {
    console.log("Confirming delete, onDelete:", onDelete);

    onDelete();
    setShowConfirm(false);
    onClose();
  };

  return ReactDOM.createPortal(
    showConfirm ? (
      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    ) : (
      <div
        className={`item-modal ${
          activeModal === "preview" ? "item-modal_opened" : ""
        }`}
      >
        <div className="item-modal__overlay" onClick={onClose}></div>
        <div className="item-modal__content">
          <button onClick={onClose} type="button" className="item-modal__close">
            <span
              className="item-modal__close-x"
              style={{ color: "#fff", fontSize: "32px" }}
            >
              ×
            </span>
          </button>
          <div className="item-modal__main">
            <img
              className="item-modal__image"
              src={card.imageUrl}
              alt={card.name}
            />
            <div className="item-modal__footer">
              <div className="item-modal__header">
                <h2 className="item-modal__caption">{card.name}</h2>
                {isOwn && isLoggedIn && (
                  <button
                    className="modal__delete-button"
                    onClick={handleDeleteClick}
                  >
                    Delete Item
                  </button>
                )}
              </div>
              <p className="item-modal__weather">Weather: {card.weather}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-root") // Ensure this exists in your HTML
  );
}

export default ItemModal;
