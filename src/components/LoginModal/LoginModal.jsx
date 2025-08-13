import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onLogin,
  onClose,
  onSubmit,
  onInputChange,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formData);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Login"
      onSubmit={handleSubmit} // Pass the handleSubmit function
      onClose={onClose} // Pass the onClose function
    >
      <label className="form__label">
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </label>
      <label className="form__label">
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </label>
      <button type="submit" className="form__submit-button">
        Login
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
