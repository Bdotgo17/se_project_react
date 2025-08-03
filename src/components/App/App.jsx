import React, { useEffect, useState } from "react";
import { signup, signin, checkToken } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext"; // Import the context
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AddGarmentForm from "../AddGarmentForm/AddGarmentForm";

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
    avatar: "",
    email: "",
    password: "",
    imageUrl: "", // For AddItemModal
    weather: "",
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to control visibility

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [currentUser, setCurrentUser] = useState(null); // State for current user
  const navigate = useNavigate(); // Initialize useNavigate
  const [isAddGarmentModalOpen, setIsAddGarmentModalOpen] = useState(false);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
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

  useEffect(() => {
    if (token) {
      checkToken(token)
        .then((user) => setIsLoggedIn(true))
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      checkToken(localStorage.getItem("jwt"))
        .then((user) => {
          setCurrentUser(user); // Set the current user data
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    console.log("showLoginModal updated:", showLoginModal);
  }, [showLoginModal]);

  useEffect(() => {
    console.log("isLoggedIn updated:", isLoggedIn); // Debug log
  }, [isLoggedIn]);

  const handleRegister = ({ name, avatar, email, password }) => {
    signup(name, avatar, email, password)
      .then(() => handleLogin({ email, password }))
      .then(() => setShowRegisterModal(false))
      .catch((err) => console.error(err));
  };

  const handleLogin = ({ email, password }) => {
    console.log("Attempting to log in with:", { email, password }); // Debug log
    signin(email, password)
      .then((res) => {
        console.log("Login successful, token:", res.token); // Debug log
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        console.log("Closing login modal after successful login"); // Debug log
        setShowLoginModal(false);
        fetchUserData(res.token); // Fetch user data after login
        console.log("JWT token in localStorage:", localStorage.getItem("jwt"));
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Login failed. Please check your email and password."); // Optional user feedback
      });
  };

  const fetchUserData = (token) => {
    fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User data fetched:", data); // Debug log
        setCurrentUser(data); // Update user state
      })
      .catch((err) => console.error("Failed to fetch user data:", err));
  };

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

        setUpdatedClothingItems((prev) => {
          const updatedItems = [addedItem, ...prev];
          console.log("Updated clothing items:", updatedItems); // Debug log
          return updatedItems;
        });

        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error adding item:", err);
        alert("Failed to add item. Please try again."); // Display error to the user
      });
  };

  const handleDeleteCard = (cardToDelete) => {
    console.log("Card to delete:", cardToDelete); // Debug log
    if (!cardToDelete || !cardToDelete._id) {
      console.error("Invalid card object:", cardToDelete);
      return;
    }

    deleteItem(cardToDelete._id, token)
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
    console.log(`Input changed: ${name} = ${value}`); // Debug log
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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // Add the user's like
        api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setUpdatedClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // Remove the user's like
        api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setUpdatedClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt"); // Remove the token from local storage
    setIsLoggedIn(false); // Set the isLoggedIn state to false
    setCurrentUser(null); // Clear the current user data
    setUpdatedClothingItems([]); // Clear clothing items
    navigate("/"); // Redirect to the home page
  };

  const closeActiveModal = () => {
    setSelectedCard(null);
    setActiveModal(""); // Close the modal by resetting the activeModal state
  };

  const handleLoginClick = () => {
    console.log("Login button clicked"); // Debug log
    setShowLoginModal(true); // Open the login modal
  };

  const handleAddClick = () => {
    console.log("Add button clicked"); // Debug log
    setActiveModal(MODALS.ADD_GARMENT); // Example action
  };

  const handleAddGarment = (name, imageUrl, weather) => {
    addItem(name, imageUrl, weather)
      .then((newItem) => {
        console.log("New item added:", newItem);
        // Update state or UI with the new item
        // Example: setItems((prevItems) => [...prevItems, newItem]);
      })
      .catch((err) => {
        console.error("Error adding garment:", err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                handleLoginClick={() => {
                  console.log("Login button clicked in header"); // Debug log
                  setShowLoginModal(true); // Open the login modal
                  console.log("handleAddClick:", handleAddClick);
                }}
                weatherData={weatherData}
                currentUser={currentUser}
                username={username}
                onProfileClick={handleProfileClick}
                currentTemperatureUnit={currentTemperatureUnit}
                onToggleSwitchChange={handleToggleSwitchChange}
                currentDate={new Date().toLocaleDateString()} // Pass the current date
              />
              {isProfileOpen && <Sidebar username={username} />}{" "}
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      {!isLoggedIn && (
                        <>
                          <button
                            onClick={() => {
                              console.log("Register button clicked");
                              setShowRegisterModal(true);
                            }}
                          >
                            Sign Up
                          </button>
                          <button
                            onClick={() => {
                              console.log("Login button clicked");
                              setShowLoginModal(true);
                            }}
                          >
                            Login
                          </button>
                        </>
                      )}
                      {isLoggedIn && (
                        <>
                          {/* Add Garment Form */}
                          <AddGarmentForm
                            onAddGarment={handleAddGarment}
                            isOpen={isAddGarmentModalOpen}
                            onClose={() => setIsAddGarmentModalOpen(false)}
                          />
                        </>
                      )}
                      {showRegisterModal && (
                        <ModalWithForm
                          isOpen={showRegisterModal}
                          title="Sign Up"
                          onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Register form submitted:", formData);
                            handleRegister(formData); // Call handleRegister with the form data
                          }}
                          onClose={() => {
                            console.log("Register modal closed");
                            setShowRegisterModal(false);
                          }}
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          <input
                            type="text"
                            name="avatar"
                            placeholder="Avatar URL"
                            value={formData.avatar}
                            onChange={handleInputChange}
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </ModalWithForm>
                      )}

                      {showLoginModal && (
                        <ModalWithForm
                          isOpen={showLoginModal}
                          title="Login"
                          onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Login form submitted:", formData);
                            handleLogin(formData); // Call handleLogin with the form data
                          }}
                          onClose={() => {
                            console.log(
                              "Login modal closed via onClose handler"
                            );
                            setShowLoginModal(false);
                          }}
                        >
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </ModalWithForm>
                      )}

                      {isLoggedIn && (
                        <>
                          <Main
                            weatherData={weatherData}
                            clothingItems={updatedClothingItems}
                            handleCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                          />
                          <ClothesSection
                            clothingItems={updatedClothingItems}
                            onCardClick={handleCardClick}
                            onAddItemClick={() =>
                              setActiveModal(MODALS.ADD_GARMENT)
                            }
                          />
                        </>
                      )}
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    isLoggedIn ? (
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile
                          clothingItems={updatedClothingItems}
                          onAddItemClick={() =>
                            setActiveModal(MODALS.ADD_GARMENT)
                          }
                          username={username}
                          onSignOut={handleSignOut}
                        />
                      </ProtectedRoute>
                    ) : (
                      <p>
                        Please log in to view your profile.{" "}
                        <button
                          onClick={() => {
                            console.log("Log In button clicked"); // Debug log
                            setShowLoginModal(true); // Open the login modal
                            console.log("showLoginModal:", showLoginModal); // Debug log
                          }}
                        >
                          Log In
                        </button>
                      </p>
                    )
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
    </CurrentUserContext.Provider>
  );
}

export default App;
