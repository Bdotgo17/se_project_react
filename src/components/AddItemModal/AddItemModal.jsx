import React from "react";
import "./AddItemModal.css";

function AddItemModal({ onClose, onSubmit }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2>Add New Item</h2>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Image URL:
            <input type="url" name="imageUrl" required />
          </label>
          <label>
            Weather:
            <select name="weather" required>
              <option value="hot">Hot</option>
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
            </select>
          </label>
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
