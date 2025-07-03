import React, { useState } from "react";
import "./AddItemModal.css";

function AddItemModal({ onClose, onSubmit }) {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted with data:", formData); // Debug log
    onSubmit(formData); // Pass form data to the parent component
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2>New Garment</h2>
        <form onSubmit={handleSubmit}>
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
                required
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
                required
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
                required
              />
              Cold
            </label>
          </fieldset>
          <button type="submit">Add Garment</button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
