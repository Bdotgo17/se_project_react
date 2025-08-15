import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ProfileModal({
  isOpen,
  onSubmit,
  onClose,
  formData,
  handleInputChange,
}) {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Change Profile Data"
      onSubmit={onSubmit}
      onClose={onClose}
      className="change-profile-modal"
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          className="modal__input"
          required
        />
      </label>
      <label className="modal__label">
        Avatar*
        <input
          type="url"
          name="avatar"
          value={formData.avatar || ""}
          onChange={handleInputChange}
          className="modal__input"
          required
        />
      </label>
      <button type="submit" className="modal__submit-button">
        Save Changes
      </button>
    </ModalWithForm>
  );
}

export default ProfileModal;
