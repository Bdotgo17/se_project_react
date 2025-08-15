import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onRegister, onClose, onToggleLogin }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formData);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="form__label">
        Email*
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form__label">
        Password*
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form__label">
        Name*
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form__label">
        Avatar URL*
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={formData.avatar || ""}
          onChange={handleChange}
        />
      </label>
      {/* Submit Button and Toggle Link */}
      <div className="form__actions">
        <button type="submit" className="form__submit-button">
          Sign Up
        </button>
        <span className="form__toggle-link">
          or{" "}
          <button
            type="button"
            className="form__toggle-button"
            onClick={onToggleLogin} // Use the onToggleLogin prop to switch to the login modal
          >
            Log In
          </button>
        </span>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
