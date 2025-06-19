import React, { useEffect, useState } from "react";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/footer";

import { filterWeatherData, getWeather } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [updatedClothingItems, setUpdatedClothingItems] =
    useState(defaultClothingItems);

  useEffect(() => {
    console.log("Active modal state updated:", activeModal);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCloseModal = () => setActiveModal(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedWeather = document.querySelector(
      'input[name="weather"]:checked'
    );

    console.log("Name:", document.getElementById("name").value);
    console.log("Image URL:", document.getElementById("imageUrl").value);
    console.log("Selected Weather:", selectedWeather);
    console.log("Selected Weather ID:", selectedWeather?.id);

    const newGarment = {
      _id: Date.now().toString(), // Generate a unique ID
      name: document.getElementById("name").value.trim(),
      link: document.getElementById("imageUrl").value.trim(),
      weather: document.querySelector("input[name='weather']:checked")?.id, // Get selected weather type
    };

    console.log("New Garment:", newGarment); // Debug log to verify the new garment data

    if (newGarment.name && newGarment.link && newGarment.weather) {
      setUpdatedClothingItems((prevItems) => [...prevItems, newGarment]);
      setActiveModal(null); // Close the modal
    } else {
      console.error("Form is incomplete. Please fill out all fields.");
    }
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          defaultClothingItems={updatedClothingItems}
        />
      </div>
      {activeModal === "add-garment" && (
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__input_type_radio"
            >
              <input
                id="hot"
                type="radio"
                name="weather"
                className="modal__radio-input"
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__input_type_radio"
            >
              <input
                id="warm"
                type="radio"
                name="weather"
                className="modal__radio-input"
              />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__input_type_radio"
            >
              <input
                id="cold"
                type="radio"
                name="weather"
                className="modal__radio-input"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
      )}
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
      <Footer />
    </div>
  );
}

export default App;
