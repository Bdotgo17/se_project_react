import ReactDOM from "react-dom";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
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
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure this exists in your HTML
  );
}

export default ItemModal;
