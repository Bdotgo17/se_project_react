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
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    console.log("Active modal state updated:", activeModal);
  }, [activeModal]);

  useEffect(() => {
    console.log("Selected Card:", selectedCard);
    console.log("Active Modal:", activeModal);
  }, [selectedCard, activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    console.log("Add clothes button clicked!");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCloseModal = () => setActiveModal(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGarment = {
      name: document.getElementById("name").value,
      imageUrl: document.getElementById("imageUrl").value,
      weather: document.querySelector('input[name="weather"]:checked')?.id, // Get selected weather type
    };

    console.log("New Garment:", newGarment); // Debug log to verify the new garment data

    if (newGarment.name && newGarment.imageUrl && newGarment.weather) {
      setClothingItems((prevItems) => [...prevItems, newGarment]); // Add new garment to the list
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
          clothingItems={clothingItems}
        />
        {selectedCard.name && selectedCard.imageUrl && (
          <div className="selected-card">
            <h2 className="card__name">{selectedCard.name}</h2>
            <img
              className="card__image"
              src={selectedCard.imageUrl}
              alt={`Image of ${selectedCard.name}`}
            />
          </div>
        )}
        <ul className="cards__list">
          {clothingItems.map((item, index) => (
            <li key={index} className="card">
              <h2 className="card__name">{item.name}</h2>
              <img
                className="card__image"
                src={item.imageUrl}
                alt={`Image of ${item.name}`}
              />
            </li>
          ))}
        </ul>
      </div>
      {activeModal === "add-garment" && (
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
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
