import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  if (activeModal !== "preview") return null;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          CLOSE
        </button>
        <img
          className="modal__image"
          src={card.link}
          alt={`Image of ${card.name}`}
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
