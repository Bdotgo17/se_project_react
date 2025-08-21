import React, { useEffect, useState } from "react";
import { signup, signin } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/footer";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import { getItems, addItem, deleteItem } from "../../utils/api";
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
import { checkToken } from "../../utils/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { defaultClothingItems } from "../../utils/constants.js";
import ProfileModal from "../ProfileModal/ProfileModal.jsx"; // Import the new component
import { getClothingItems } from "./../../utils/api.js"; // Import the getClothingItems function

export const MODALS = {
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

  const [updatedClothingItems, setUpdatedClothingItems] =
    useState(defaultClothingItems);

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const currentWeatherType = weatherData?.type || "default"; // Replace "default" with a fallback value

  const filteredClothingItems = updatedClothingItems.filter(
    (item) =>
      item.weather === currentWeatherType || currentWeatherType === "default"
  );

  const [cards, setCards] = useState([]);
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    console.log("Checking weather...");
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
    console.log("useEffect is running...");
    getItems()
      .then((items) => {
        console.log("Fetching clothing items...");
        setUpdatedClothingItems(items);
        console.log("Updated clothing items state:", items); // Debugging: Log the updated state
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);

  useEffect(() => {
    console.log("Checking token on component mount...");
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData); // Update the state with user data
          setIsLoggedIn(true); // Mark the user as logged in
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          localStorage.removeItem("jwt"); // Clear invalid token
          setIsLoggedIn(false); // Mark the user as logged out
        });
    } else {
      console.log("No token found, redirecting to login...");
    }
  }, []);

  const fetchClothingItems = async () => {
    try {
      const items = await getClothingItems(); // Replace with your API call
      setUpdatedClothingItems(items);
    } catch (error) {
      console.error("Failed to fetch clothing items:", error);
    }
  };

  console.log("Filtered clothing items:", filteredClothingItems);

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      // Call the signup API
      await signup(name, avatar, email, password);

      // Log the user in after successful registration
      await handleLogin({ email, password });

      console.log("Registering user:", formData);

      // Close the register modal
      setShowRegisterModal(false);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again."); // Optional user feedback
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      // Call the signin API
      const res = await signin(email, password);
      console.log("Signin response:", res);

      // Validate the token
      if (!res.token) {
        throw new Error("Token is missing from the signin response");
      }

      // Save the token to localStorage
      localStorage.setItem("jwt", res.token);
      setToken(res.token);

      // Fetch user data after login using checkToken
      const user = await checkToken(res.token);

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

  const fetchUserData = async (token) => {
    try {
      const data = await checkToken(token);
      setCurrentUser(data); // Update user state
      return data;
    } catch (err) {
      console.error("Failed to fetch user data:", err); // Log the error
      throw err; // Re-throw the error for further handling
    }
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

        closeActiveModal();
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
        closeActiveModal();
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
    console.log("handleCardLike called for:", card);

    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Optimistically update UI
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
      removeCardLike(card._id)
        .then((updatedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? updatedCard : c))
          );
          setUpdatedClothingItems((items) =>
            items.map((item) => (item._id === card._id ? updatedCard : item))
          );
        })
        .catch((err) => console.error("Error removing like:", err));
    } else {
      addCardLike(card._id)
        .then((updatedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? updatedCard : c))
          );
          setUpdatedClothingItems((items) =>
            items.map((item) => (item._id === card._id ? updatedCard : item))
          );
        })
        .catch((err) => console.error("Error adding like:", err));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt"); // Remove the token from local storage
    setIsLoggedIn(false); // Set the isLoggedIn state to false
    setCurrentUser(null); // Clear the current user data
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
    closeActiveModal(MODALS.ADD_GARMENT); // Example action
  };

  const handleAddGarment = (name, imageUrl, weather) => {
    return addItem(name, imageUrl, weather)
      .then((newItem) => {
        setUpdatedClothingItems((prevItems) => [newItem, ...prevItems]); // Update state
        closeActiveModal(null); // Close the modal after submission
      })
      .catch((err) => {
        console.error("Error adding garment:", err);
        throw err;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Remove the JWT token
    setIsLoggedIn(false); // Update the logged-in state
    setCurrentUser(null); // Clear the current user data
    setUpdatedClothingItems([]); // Clear clothing items
    setWeatherData({ type: "", temp: { F: 0, C: 0 }, city: "" }); // Reset weather data
    navigate("/"); // Redirect to the home page
    setIsSidebarOpen(false); // Close the sidebar
    getWeather(coordinates, APIkey).then((data) =>
      setWeatherData(filterWeatherData(data))
    );
    getItems().then((items) => setUpdatedClothingItems(items));
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
    updateUserProfile(updatedProfile)
      .then((data) => {
        setCurrentUser(data); // Update the current user state
        closeActiveModal(); // Close the modal after a successful update (if applicable)
      })
      .catch((err) => {
        console.error("Error updating profile:", err); // Log the error
      });
  };

  const handleAddItemClick = () => {
    console.log("Add New button clicked");
    setActiveModal(MODALS.ADD_GARMENT); // Set the modal to open
  };

  function openLoginModal() {
    setActiveModal("login");
  }

  function openRegisterModal() {
    setActiveModal("register");
  }

  function closeModal() {
    setActiveModal(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className={`App ${isProfileOpen ? "sidebar-open" : ""}`}>
          <div className="page">
            <div className="page__content">
              {activeModal === "preview" && (
                <div
                  className="item-modal__overlay"
                  onClick={closeActiveModal}
                ></div>
              )}
              <Header
                handleAddClick={() => {
                  setActiveModal(MODALS.ADD_GARMENT);
                }}
                onSidebarToggle={handleSidebarToggle} // Pass the toggle function to Header
                setShowRegisterModal={setShowRegisterModal} // Pass the function to show the register modal
                handleLoginClick={() => setShowLoginModal(true)} // Pass the function to show the login modal
                weatherData={weatherData}
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
                onAddItemClick={handleAddItemClick}
              />
              {isProfileOpen && (
                <Profile
                  isOpen={isProfileOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  username={username}
                  onSignOut={handleSignOut}
                  onAddGarmentClick={handleAddGarmentClick}
                  clothingItems={updatedClothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onChangeProfileData={handleChangeProfileData} // Pass the function to Sidebar
                  isLoggedIn={isLoggedIn} // Pass isLoggedIn to Sidebar
                  onLogout={handleLogout} // Pass the logout function
                  onAddItemClick={() => setActiveModal(MODALS.ADD_GARMENT)} // <-- Pass the function here!
                  currentWeatherType={weatherData.type}
                  currentUser={currentUser}
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
                              isOpen={activeModal === MODALS.ADD_GARMENT}
                              onSubmit={handleAddGarment}
                              onClose={() => setActiveModal(null)}
                            />
                          )}
                        </>
                      )}
                      {showRegisterModal && (
                        <RegisterModal
                          isOpen={showRegisterModal}
                          onRegister={handleRegister} // Call your register logic
                          onClose={() => setShowRegisterModal(false)} // Close the register modal
                          onToggleLogin={() => {
                            setShowRegisterModal(false); // Close the register modal
                            setShowLoginModal(true); // Open the login modal
                          }}
                        />
                      )}
                      {showLoginModal && (
                        <LoginModal
                          isOpen={showLoginModal}
                          onLogin={handleLogin} // Pass the handleLogin function as the onLogin prop
                          onClose={() => setShowLoginModal(false)}
                          onToggleRegister={() => {
                            setShowLoginModal(false); // Close the login modal
                            setShowRegisterModal(true); // Open the register modal
                          }}
                        />
                      )}
                      <>
                        <Main
                          isLoggedIn={isLoggedIn} // Pass the isLoggedIn state as a prop
                          weatherData={weatherData}
                          clothingItems={filteredClothingItems}
                          handleCardClick={handleCardClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          currentUser={currentUser}
                          currentWeatherType={weatherData.type}
                        />
                      </>
                      <></>
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    isLoggedIn ? (
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <>
                          <Profile
                            isOpen={isProfileOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            username={username}
                            onSignOut={handleSignOut}
                            onAddGarmentClick={handleAddGarmentClick}
                            clothingItems={updatedClothingItems}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onChangeProfileData={handleChangeProfileData}
                            isLoggedIn={isLoggedIn}
                            onLogout={handleLogout}
                            onAddItemClick={() =>
                              setActiveModal(MODALS.ADD_GARMENT)
                            }
                            currentWeatherType={weatherData.type}
                            currentUser={currentUser}
                          />
                          <ProfileModal
                            isOpen={isProfileModalOpen}
                            onSubmit={handleProfileSubmit}
                            onClose={() => setIsProfileModalOpen(false)}
                            formData={formData}
                            handleInputChange={handleInputChange}
                          />
                        </>
                      </ProtectedRoute>
                    ) : (
                      <p>You must be logged in to view this page.</p>
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
              {activeModal === MODALS.ADD_GARMENT && (
                <AddGarmentForm
                  formData={formData}
                  setFormData={setFormData}
                  isOpen={activeModal === MODALS.ADD_GARMENT}
                  onSubmit={handleAddGarment}
                  onClose={() => setActiveModal(null)}
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
