import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddGarmentForm.css";

function AddGarmentForm({
  onAddGarment,
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure onSubmit returns a Promise
    onSubmit(formData.name, formData.imageUrl, formData.weather)
      .then(() => {
        onClose(); // Close the modal only after a successful response
      })
      .catch((error) => {
        console.error("Error submitting garment:", error);
        // Optionally, handle the error (e.g., show an error message)
      });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
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
          placeholder="Name"
          required
        />
      </label>
      <label className="form__label">
        Image
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="form__input"
          placeholder="Image URL"
          required
        />
      </label>
      <label className="form__label">
        Select the weather type
        <div className="form__radio-group">
          <label className="form__radio-label">
            <input
              type="radio"
              name="weather"
              value="hot"
              checked={weather === "hot"}
              onChange={(e) => setWeather(e.target.value)}
              className="form__radio-input"
              required
            />
            <span>Hot</span>
          </label>
          <label className="form__radio-label">
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={weather === "warm"}
              onChange={(e) => setWeather(e.target.value)}
              className="form__radio-input"
              required
            />
            <span>Warm</span>
          </label>
          <label className="form__radio-label">
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={weather === "cold"}
              onChange={(e) => setWeather(e.target.value)}
              className="form__radio-input"
              required
            />
            <span>Cold</span>
          </label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default AddGarmentForm;
