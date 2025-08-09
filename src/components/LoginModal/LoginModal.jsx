import React, { useState } from "react";

function LoginModal({ onLogin, onClose }) {
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
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}

export default LoginModal;
