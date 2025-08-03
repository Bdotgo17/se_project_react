import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddGarmentForm({ onAddGarment, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGarment(name, imageUrl, weather); // Call the onAddGarment prop
    onClose(); // Close the modal after submission
  };

  return (
    <ModalWithForm
      title="Add Garment"
      buttonText="Add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form__input"
          required
        />
      </label>
      <label className="form__label">
        Image URL
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="form__input"
          required
        />
      </label>
      <label className="form__label">
        Weather
        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          className="form__input"
          required
        >
          <option value="">Select Weather</option>
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
        </select>
      </label>
    </ModalWithForm>
  );
}

export default AddGarmentForm;