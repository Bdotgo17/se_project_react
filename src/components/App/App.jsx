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
  const [selectedCard, setSelectedCard] = useState(null);
  const [updatedClothingItems, setUpdatedClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [username, setUsername] = useState("Terrence Tegegne"); // Shared username state
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to control visibility

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        // Catch the error here
        console.error("Failed to fetch weather data:", err); // Use the caught error variable (err)
      });
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

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev); // Toggle visibility
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardClick = (card) => {
    console.log("Selected card:", card); // Debug log
    setSelectedCard(card);
    setActiveModal(MODALS.PREVIEW);
  };

  const handleAddItemSubmit = (newItem) => {
    console.log("New item to add:", newItem);

    addItem(newItem.name, newItem.imageUrl, newItem.weather)
      .then((addedItem) => {
        console.log("Added item from API:", addedItem);
        setUpdatedClothingItems((prev) => [addedItem, ...prev]);
        setActiveModal("");
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleDeleteCard = (cardToDelete) => {
    console.log("Card to delete:", cardToDelete); // Debug log
    if (!cardToDelete || !cardToDelete._id) {
      console.error("Invalid card object:", cardToDelete);
      return;
    }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, imageUrl, weather } = formData;

    if (name && imageUrl && weather) {
      const newGarment = {
        name: name.trim(),
        imageUrl: imageUrl.trim(),
        weather,
      };

      console.log("Submitting new garment:", newGarment); // Debug log
      handleAddItemSubmit(newGarment);
    } else {
      console.error("Form is incomplete. Please fill out all fields.");
    }
  };

  const closeActiveModal = () => {
    setSelectedCard(null);
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
                handleAddClick={() => {
                  console.log("Add Clothes button clicked"); // Debug log
                  setActiveModal(MODALS.ADD_GARMENT);
                }}
                weatherData={weatherData}
                username={username}
                onProfileClick={handleProfileClick}
              />
              {isProfileOpen && <Sidebar username={username} />}{" "}
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
              {activeModal === MODALS.ADD_GARMENT && (
                <AddItemModal
                  onClose={() => setActiveModal("")}
                  onSubmit={handleSubmit}
                  formData={formData} // Pass form data state
                  handleChange={handleInputChange}
                />
              )}
              {activeModal === MODALS.PREVIEW && (
                <ItemModal
                  activeModal={activeModal}
                  card={selectedCard} // Pass the selected card details
                  onClose={closeActiveModal} // Close the modal
                  handleDeleteCard={handleDeleteCard} // Pass the delete handler
                />
              )}
              <Footer />
            </div>
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </Router>
  );
}

export default App;
