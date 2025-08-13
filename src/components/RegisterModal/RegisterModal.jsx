import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onRegister, onClose }) {
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
      buttonText="Register"
    >
      <label className="form__label">
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form__label">
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
    // <div className="modal">
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       name="name"
    //       placeholder="Name"
    //       value={formData.name}
    //       onChange={handleChange}
    //       required
    //     />
    //     <input
    //       type="text"
    //       name="avatar"
    //       placeholder="Avatar URL"
    //       value={formData.avatar}
    //       onChange={handleChange}
    //       required
    //     />
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       required
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       required
    //     />
    //     <button type="submit">Register</button>
    //     <button type="button" onClick={onClose}>
    //       Close
    //     </button>
    //   </form>
    // </div>
  );
}

export default RegisterModal;
