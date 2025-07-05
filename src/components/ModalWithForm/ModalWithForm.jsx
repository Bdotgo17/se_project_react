import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;
  
  return (
    <div className={`form-modal ${isOpen ? "form-modal_opened" : ""}`}>
      <div className="form-modal__overlay" onClick={onClose}></div>
      <div className="form-modal__content">
        <button
          onClick={onClose}
          type="button"
          className="form-modal__close"
        ></button>
        <h2 className="form-modal__title">{title}</h2>
        <form className="form-modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form-modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
