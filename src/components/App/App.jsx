import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/footer";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import { getItems, addItem, deleteItem } from "../../utils/api";
import Sidebar from "../Sidebar/Sidebar";
import AddItemModal from "../AddItemModal/AddItemModal";

const MODALS = {
  ADD_GARMENT: "add-garment",
  PREVIEW: "preview",
};

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [updatedClothingItems, setUpdatedClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [username, setUsername] = useState("Terrence Tegegne"); // Shared username state
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        console.log("Fetched items:", items); // Debug log

        setUpdatedClothingItems(items);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);

  useEffect(() => {
    console.log("Updated clothing items:", updatedClothingItems);
  }, [updatedClothingItems]);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal(MODALS.PREVIEW);
  };

  const handleDeleteCard = (cardToDelete) => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setUpdatedClothingItems((prev) => {
          console.log("Previous items before delete:", prev); // Debug log
          return prev.filter((item) => item._id !== cardToDelete._id);
        });
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const handleAddItemSubmit = (newItem) => {
    console.log("New item to add:", newItem); // Debug log

    addItem(newItem.name, newItem.imageUrl, newItem.weather)
      .then((addedItem) => {
        console.log("Added item from API:", addedItem); // Debug log

        setUpdatedClothingItems((prev) => {
          const safePrev = Array.isArray(prev) ? prev : [];
          return [addedItem, ...safePrev];
        });
        console.log("Previous items:", prev); // Debug log
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, imageUrl, weather } = formData;

    if (name && imageUrl && weather) {
      const newGarment = {
        _id: Date.now().toString(),
        name: name.trim(),
        link: imageUrl.trim(),
        weather,
      };

      handleAddItemSubmit(newGarment);
    } else {
      console.error("Form is incomplete. Please fill out all fields.");
    }
  };

  const closeActiveModal = () => {
    setActiveModal(""); // Close the modal by resetting the activeModal state
  };

  return (
    <Router>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="App">
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={() => setActiveModal(MODALS.ADD_GARMENT)}
                weatherData={weatherData}
                username={username}
              />
              <Sidebar username="John Doe" />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Main
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={updatedClothingItems}
                      />
                      <ClothesSection
                        clothingItems={updatedClothingItems}
                        onAddItemClick={() =>
                          setActiveModal(MODALS.ADD_GARMENT)
                        }
                        onCardClick={handleCardClick}
                      />
                    </>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <Profile
                      clothingItems={updatedClothingItems}
                      onAddItemClick={() => setActiveModal(MODALS.ADD_GARMENT)}
                      username={username}
                    />
                  }
                />
              </Routes>
            </div>

            {activeModal === MODALS.ADD_GARMENT && (
              <ModalWithForm
                title="New Garment"
                buttonText="Add Garment"
                isOpen={activeModal === MODALS.ADD_GARMENT}
                onClose={() => setActiveModal("")}
                onSubmit={handleSubmit}
              >
                <label htmlFor="name" className="modal__label">
                  Name{" "}
                  <input
                    type="text"
                    className="modal__input"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="imageUrl" className="modal__label">
                  Image{" "}
                  <input
                    type="text"
                    className="modal__input"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                </label>
                <fieldset className="modal__radio-buttons">
                  <legend className="modal__legend">
                    Select the weather type:
                  </legend>
                  <label
                    htmlFor="hot"
                    className="modal__label modal__input_type_radio"
                  >
                    <input
                      id="hot"
                      type="radio"
                      name="weather"
                      value="hot"
                      checked={formData.weather === "hot"}
                      onChange={handleInputChange}
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
                      value="warm"
                      checked={formData.weather === "warm"}
                      onChange={handleInputChange}
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
                      value="cold"
                      checked={formData.weather === "cold"}
                      onChange={handleInputChange}
                      className="modal__radio-input"
                    />
                    Cold
                  </label>
                </fieldset>
              </ModalWithForm>
            )}
            {activeModal === MODALS.ADD_GARMENT && (
              <AddItemModal
                onClose={() => setActiveModal("")} // Close the modal
                onSubmit={handleAddItemSubmit} // Handle form submission
              />
            )}
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteCard={handleDeleteCard} // Pass the delete handler
            />
            <Footer />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </Router>
  );
}

export default App;
