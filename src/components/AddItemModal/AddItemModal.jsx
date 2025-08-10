import React, { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({
  onClose,
  onSubmit,
  formData = { name: "", imageUrl: "", weather: "" },
  handleChange,
}) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={true} // Assuming this modal is always open when rendered
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter clothing name"
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
        />
      </label>
      <label>Select the weather type:</label>
      <fieldset>
        <label>
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={formData.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={formData.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={formData.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
