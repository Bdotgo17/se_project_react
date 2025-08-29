import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onLogin,
  onClose,
  onSubmit,
  onInputChange,
  onToggleRegister,
}) {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Add error state

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

 async function handleSubmit(e) {
   e.preventDefault();
   const loginError = await onLogin(formData);
   if (loginError) {
     setError("Email or password incorrect");
   } else {
     setError("");
   }
 }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Login"
      onSubmit={handleSubmit} // Use the handleSubmit function
      onClose={onClose} // Use the onClose prop to close the modal
    >
      <label className="form__label">
        Email
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
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password || ""}
          onChange={handleChange}
          required
        />
      </label>
      {/* Submit Button and Toggle Link */}
      {error && <div className="form__error">{error}</div>}

      <div className="form__actions">
        <button type="submit" className="form__submit-button">
          Log In
        </button>
        <span className="form__toggle-link">
          or{" "}
          <button
            type="button"
            className="form__toggle-button"
            onClick={onToggleRegister} // Use the onToggleRegister prop to open the Sign Up modal
          >
            Sign Up
          </button>
        </span>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
