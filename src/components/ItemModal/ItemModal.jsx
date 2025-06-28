import ReactDOM from "react-dom";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleDeleteCard }) {
  if (activeModal !== "preview") return null;

  return ReactDOM.createPortal(
    <div
      className={`item-modal ${
        activeModal === "preview" ? "item-modal_opened" : ""
      }`}
    >
      <div className="item-modal__overlay" onClick={onClose}></div>
      <div className="item-modal__content">
        <button onClick={onClose} type="button" className="item-modal__close">
          CLOSE
        </button>
        <img
          className="item-modal__image"
          src={card.link}
          alt={`Image of ${card.name}`}
        />
        <div className="item-modal__footer">
          <h2 className="item-modal__caption">{card.name}</h2>
          <p className="item-modal__weather">Weather: {card.weather}</p>
          <button
            className="item-modal__delete-button"
            onClick={() => handleDeleteCard(card)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure this exists in your HTML
  );
}

export default ItemModal;
