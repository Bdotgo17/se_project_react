import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <ModalWithForm
      className="confirm-delete-modal"
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="form-modal__title confirm-delete-modal__title-main">
        Are you sure you want to delete this item?
      </h2>
      <p className="confirm-delete-modal__subtitle">
        This action is irreversible
      </p>
      <div className="confirm-delete-modal__actions">
        <button
          type="button"
          className="form-modal__submit"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>
        <button type="button" onClick={onClose} className="form-modal__cancel">
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
}

export default ConfirmDeleteModal;
