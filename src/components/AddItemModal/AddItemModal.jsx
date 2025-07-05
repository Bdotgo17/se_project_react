import React, { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, onSubmit, formData, handleChange }) {
  // // State to manage form inputs
  // const [formData, setFormData] = useState({
  //   name: "",
  //   imageUrl: "",
  //   weather: "",
  // });

  // // Handle input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior
  //   console.log("Form submitted with data:", formData); // Debug log
  //   onSubmit(formData); // Pass form data to the parent component
  //   onClose(); // Close the modal after submission
  // };

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
