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
import WeatherCard from "../WeatherCard/WeatherCard";
import { addCardLike, removeCardLike } from "../../utils/api.js"; // Adjust the path if needed
import ItemCard from "../ItemCard/ItemCard.jsx"; // Adjust the path if needed
import { BASE_URL } from "../../utils/constants";
import { updateUserProfile } from "../../utils/api"; // Import the updateUserProfile function

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
  const [activeModal, setActiveModal] = useState(null);
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

  const [currentUser, setCurrentUser] = useState({
    name: "Default User",
    avatar: "", // Default avatar
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const filteredClothingItems = updatedClothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  const [cards, setCards] = useState([]);

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

  useEffect(() => {}, [showLoginModal]);

  useEffect(() => {}, [isLoggedIn]);

  const handleRegister = ({ name, avatar, email, password }) => {
    signup(name, avatar, email, password)
      .then(() => handleLogin({ email, password }))
      .then(() => setShowRegisterModal(false))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // Fetch user data from the backend and set it in state
    fetch("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      // Call the signin API
      const res = await signin(email, password);

      // Validate the token
      if (!res.token) {
        throw new Error("Token is missing from the signin response");
      }

      // Save the token to localStorage
      localStorage.setItem("jwt", res.token);
      setToken(res.token);

      // Fetch user data after login
      const user = await fetchUserData(res.token);

      // Validate the user data
      if (!user) {
        throw new Error("User data is missing from the fetchUserData response");
      }

      // Update state
      setCurrentUser(user); // Set the current user
      setIsLoggedIn(true); // Update the logged-in state

      // Close the login modal
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your email and password."); // Optional user feedback
    }
  };

  const fetchUserData = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          // Handle non-OK responses
          return res
            .json()
            .then((err) =>
              Promise.reject(`Error: ${err.message || res.status}`)
            );
        }
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        setCurrentUser(data); // Update user state
        return data; // Return the user data for further use
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err); // Log the error
        throw err; // Re-throw the error for further handling
      });
  };

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => {
      return !prev;
    });
  };

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

  const handleAddItemSubmit = (newItem) => {
    addItem(newItem.name, newItem.imageUrl, newItem.weather)
      .then((addedItem) => {
        setUpdatedClothingItems((prev) => {
          const updatedItems = [addedItem, ...prev];
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
    if (!cardToDelete || !cardToDelete._id) {
      console.error("Invalid card object:", cardToDelete);
      return;
    }

    deleteItem(cardToDelete._id, token)
      .then(() => {
        setUpdatedClothingItems((prev) => {
          const updatedItems = prev.filter(
            (item) => item._id !== cardToDelete._id
          );
          return updatedItems;
        });
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
        alert("Failed to delete the item. Please try again.");
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

      handleAddItemSubmit(newGarment);
    } else {
      console.error("Form is incomplete. Please fill out all fields.");
    }
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Optimistically update the state for updatedClothingItems
    setUpdatedClothingItems((prevItems) =>
      prevItems.map((item) =>
        item._id === card._id
          ? {
              ...item,
              likes: isLiked
                ? item.likes.filter((id) => id !== currentUser._id)
                : [...item.likes, currentUser._id],
            }
          : item
      )
    );
    if (isLiked) {
      // Call removeCardLike if the card is already liked
      removeCardLike(card._id)
        .then((updatedCard) => {
          setCards((state) => {
            const updatedState = state.map((c) =>
              c._id === card._id ? updatedCard : c
            );
            return updatedState;
          });
        })
        .catch((err) => console.error("Error removing like:", err));
    } else {
      // Call addCardLike if the card is not liked
      addCardLike(card._id)
        .then((updatedCard) => {
          setCards((state) => {
            const updatedState = state.map((c) =>
              c._id === card._id ? updatedCard : c
            );
            return updatedState;
          });
        })
        .catch((err) => console.error("Error adding like:", err));
    }
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
    setShowLoginModal(true); // Open the login modal
  };

  const handleAddClick = () => {
    setActiveModal(MODALS.ADD_GARMENT); // Example action
  };

  const handleAddGarment = (name, imageUrl, weather) => {
    addItem(name, imageUrl, weather)
      .then((newItem) => {
        setUpdatedClothingItems((prevItems) => [...prevItems, newItem]); // Update state
        setActiveModal(null); // Close the modal after submission
      })
      .catch((err) => {
        console.error("Error adding garment:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Remove the JWT token
    setIsLoggedIn(false); // Update the logged-in state
    setCurrentUser(null); // Clear the current user data
    navigate("/"); // Redirect to the home page
    setIsSidebarOpen(false); // Close the sidebar
  };

  const handleAddGarmentClick = () => {
    setActiveModal(MODALS.ADD_GARMENT);
  };

  // Define the handleSidebarToggle function
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChangeProfileData = () => {
    setFormData({
      name: currentUser.name,
      avatar: currentUser.avatar,
    });
    setIsSidebarOpen(false); // Close the sidebar
    setIsProfileModalOpen(true); // Open the modal
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // Send PATCH request to update the profile on the backend
    updateUserProfile({ name: formData.name, avatar: formData.avatar })
      .then((updatedUser) => {
        // Update the currentUser state with the response from the backend
        setCurrentUser(updatedUser);
        setIsProfileModalOpen(false); // Close the modal after submission
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  const openProfileModal = () => {
    setFormData({
      ...formData, // keep other fields if needed
      name: currentUser?.name || "",
      avatar: currentUser?.avatar || "",
    });
    setIsProfileModalOpen(true);
  };

  const handleLikeClick = (item) => {
    const isLiked = item.likes.some((id) => id === currentUser._id);

    // Optimistically update the state
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === item._id
          ? {
              ...card,
              likes: isLiked
                ? card.likes.filter((id) => id !== currentUser._id)
                : [...card.likes, currentUser._id],
            }
          : card
      )
    );

    // Call the API to update the backend
    if (isLiked) {
      removeCardLike(item._id)
        .then((updatedCard) => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card._id === updatedCard._id ? updatedCard : card
            )
          );
        })
        .catch((err) => {
          console.error("Error removing like:", err);
        });
    } else {
      addCardLike(item._id)
        .then((updatedCard) => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card._id === updatedCard._id ? updatedCard : card
            )
          );
        })
        .catch((err) => {
          console.error("Error adding like:", err);
        });
    }
  };

  const handleProfileChange = (updatedProfile) => {
    fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCurrentUser(data); // Update the current user state
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  const handleAddItemClick = () => {
    setActiveModal(MODALS.ADD_GARMENT); // Set the modal to open
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className={`App ${isProfileOpen ? "sidebar-open" : ""}`}>
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={() => {
                  setActiveModal(MODALS.ADD_GARMENT);
                }}
                onSidebarToggle={handleSidebarToggle} // Pass the toggle function to Header
                setShowRegisterModal={setShowRegisterModal} // Pass the function to show the register modal
                handleLoginClick={() => setShowLoginModal(true)} // Pass the function to show the login modal
                setShowLoginModal={setShowLoginModal}
                weatherData={weatherData}
                currentUser={currentUser}
                username={username}
                isLoggedIn={isLoggedIn}
                setActiveModal={setActiveModal}
                onProfileClick={handleProfileClick}
                currentTemperatureUnit={currentTemperatureUnit}
                onToggleSwitchChange={handleToggleSwitchChange}
                currentDate={new Date().toLocaleDateString()} // Pass the current date
                handleChangeProfileData={handleChangeProfileData}
                handleLogout={handleLogout}
                onChangeProfileData={handleChangeProfileData}
                onLogout={handleLogout}
              />

              {!isLoggedIn && <WeatherCard temperature={weatherData.temp} />}

              {isSidebarOpen && (
                <SideBar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  currentUser={currentUser}
                  username={username}
                  onProfileClick={handleProfileClick}
                  onSignOut={handleSignOut}
                  onAddGarmentClick={handleAddGarmentClick}
                  clothingItems={updatedClothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onChangeProfileData={handleChangeProfileData} // Pass the function to Sidebar
                  isLoggedIn={isLoggedIn} // Pass isLoggedIn to Sidebar
                  onLogout={handleLogout} // Pass the logout function
                />
              )}
              <ModalWithForm
                isOpen={isProfileModalOpen}
                title="Change Profile Data"
                onSubmit={handleProfileSubmit}
                onClose={() => setIsProfileModalOpen(false)}
                className="change-profile-modal"
              >
                <label className="modal__label">
                  Name*
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="modal__input"
                    required
                  />
                </label>
                <label className="modal__label">
                  Avatar*
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar || ""}
                    onChange={handleInputChange}
                    className="modal__input"
                    required
                  />
                </label>
                <button type="submit" className="modal__submit-button">
                  Save Changes
                </button>
              </ModalWithForm>
              {isProfileOpen && (
                <Sidebar
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                  currentUser={currentUser}
                  username={username}
                  onProfileClick={handleProfileClick}
                  onSignOut={handleSignOut}
                  onChangeProfileData={handleChangeProfileData} // Pass the function
                  onAddGarmentClick={handleAddGarmentClick}
                  clothingItems={updatedClothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  handleDeleteCard={handleDeleteCard}
                  handleAddItemSubmit={handleAddItemSubmit}
                  handleInputChange={handleInputChange}
                  formData={formData} // Pass form data state
                  handleSubmit={handleSubmit} // Pass the submit handler
                  onLogout={handleLogout} // Pass the logout function
                />
              )}
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      {isLoggedIn && (
                        <>
                          {activeModal === MODALS.ADD_GARMENT && (
                            <AddGarmentForm
                              formData={formData}
                              setFormData={setFormData}
                              onAddGarment={handleAddGarment}
                              isOpen={activeModal === MODALS.ADD_GARMENT}
                              onSubmit={handleAddGarment}
                              onClose={() => setActiveModal(null)}
                            />
                          )}
                        </>
                      )}
                      {showRegisterModal && (
                        <ModalWithForm
                          isOpen={showRegisterModal}
                          title="Sign Up"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleRegister(formData); // Call handleRegister with the form data
                          }}
                          onClose={() => {
                            setShowRegisterModal(false);
                          }}
                        >
                          <label className="form__label">
                            Email*
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </label>
                          <label className="form__label">
                            Password*
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={formData.password || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </label>
                          <label className="form__label">
                            Name*
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={formData.name || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </label>
                          <label className="form__label">
                            Avatar URL*
                            <input
                              type="text"
                              name="avatar"
                              placeholder="Avatar URL"
                              value={formData.avatar || ""}
                              onChange={handleInputChange}
                            />
                          </label>
                          {/* Submit Button and Toggle Link */}
                          <div className="form__actions">
                            <button
                              type="submit"
                              className="form__submit-button"
                            >
                              Sign Up
                            </button>
                            <span className="form__toggle-link">
                              or{" "}
                              <button
                                type="button"
                                className="form__toggle-button"
                                onClick={() => {
                                  setShowRegisterModal(false); // Close the Sign Up modal
                                  setShowLoginModal(true); // Open the Log In modal
                                }}
                              >
                                Log In
                              </button>
                            </span>
                          </div>
                        </ModalWithForm>
                      )}

                      {showLoginModal && (
                        <ModalWithForm
                          isOpen={showLoginModal}
                          title="Login"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin(formData); // Call handleLogin with the form data
                          }}
                          onClose={() => {
                            setShowLoginModal(false);
                          }}
                        >
                          <label className="form__label">
                            Email
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </label>
                          <label className="form__label">
                            Password
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={formData.password || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </label>
                          {/* Submit Button and Toggle Link */}
                          <div className="form__actions">
                            <button
                              type="submit"
                              className="form__submit-button"
                            >
                              Log In
                            </button>
                            <span className="form__toggle-link">
                              or{" "}
                              <button
                                type="button"
                                className="form__toggle-button"
                                onClick={() => {
                                  setShowLoginModal(false); // Close the Log In modal
                                  setShowRegisterModal(true); // Open the Sign Up modal
                                }}
                              >
                                Sign Up
                              </button>
                            </span>
                          </div>
                        </ModalWithForm>
                      )}

                      {isLoggedIn && (
                        <>
                          <Main
                            weatherData={weatherData}
                            clothingItems={updatedClothingItems}
                            updatedClothingItems={updatedClothingItems}
                            handleCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                          />
                          <div className="cards-container">
                            {cards.map((card) => (
                              <ItemCard
                                key={card._id}
                                item={card}
                                onCardClick={handleCardClick}
                                onCardLike={handleLikeClick}
                                currentWeatherType={currentWeatherType}
                                currentUser={currentUser}
                              />
                            ))}
                          </div>
                          <ClothesSection
                            showHeader={true}
                            clothingItems={updatedClothingItems}
                            onCardClick={handleCardClick}
                            onAddItemClick={handleAddItemClick} // Pass the handler here
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
                        <>
                          <Sidebar
                            currentUser={currentUser}
                            onChangeProfileData={handleProfileChange}
                          />
                          <ClothesSection
                            clothingItems={updatedClothingItems}
                            onCardClick={handleCardClick}
                            onAddItemClick={() =>
                              setActiveModal(MODALS.ADD_GARMENT)
                            }
                          />
                          <Profile
                            clothingItems={updatedClothingItems}
                            onAddItemClick={() =>
                              setActiveModal(MODALS.ADD_GARMENT)
                            }
                            onSignOut={handleSignOut}
                          />
                        </>
                      </ProtectedRoute>
                    ) : (
                      <p>
                        Please log in to view your profile.{" "}
                        <button
                          onClick={() => {
                            setShowLoginModal(true); // Open the login modal
                          }}
                        >
                          Log In
                        </button>
                      </p>
                    )
                  }
                />
              </Routes>

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
            <div className="page__sidebar"></div>
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
