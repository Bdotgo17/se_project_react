import React, { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
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
  const [activeModal, setActiveModal] = useState("preview");
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    console.log("Active modal state updated:", activeModal);
  }, [activeModal]);

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Add clothes button clicked!");
    setActiveModal("add-garment");
    setTimeout(() => console.log("Active modal state:", activeModal), 0); // Debug log // Debug log
  };

  const closeActiveModal = () => {
    setActiveModal(" ");
  };

  const handleCloseModal = () => setActiveModal(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    handleCloseModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <button onClick={handleAddClick}>Add Garment</button>
      {activeModal === "add-garment" && (
        <ModalWithForm
          title="Add Garment"
          buttonText="Submit"
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
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
              <input id="hot" type="radio" className="modal__radio-input" /> Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__input_type_radio"
            >
              <input id="warm" type="radio" className="modal__radio-input" />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__input_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio-input" />{" "}
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
      <Footer /> {/* Add Footer */}
    </div>
  );
}

export default App;
