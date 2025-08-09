const BASE_URL = "http://localhost:3001";

function checkResponse(res) {
  if (!res.ok) {
    return res.json().then((err) => {
      console.error("Error response from server:", err);
      throw new Error(err.message || "Something went wrong");
    });
  }
  return res.json();
}

export function getItems() {
  return fetch(`${BASE_URL}/items`) // Use BASE_URL and append /items
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("Error in getItems:", err); // Debug log
      throw err; // Re-throw the error for further handling
    });
}

export function addItem(name, imageUrl, weather) {
  const token = localStorage.getItem("jwt"); // Retrieve the token from local storage
  if (!token) {
    console.error("No JWT token found in localStorage");
    return Promise.reject("No JWT token found");
  }

  const payload = { name, imageUrl, weather };

  return fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    })
    .then((data) => {
      return data;
    });
}

export function deleteItem(id) {
  const token = localStorage.getItem("jwt"); // Retrieve the token from local storage
 
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 404) {
        console.error("Item not found on the server.");
        throw new Error("Item not found.");
      }
      return checkResponse(res);
    })
    .catch((err) => {
      console.error("Error in deleteItem:", err); // Debug log
      throw err; // Re-throw the error for further handling
    });
}

export const addCardLike = (cardId) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return Promise.reject("Error: No token found");
  }
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json(); // Ensure the updated card is returned
  });
};

export const removeCardLike = (cardId) => {
  const token = localStorage.getItem("jwt"); // Retrieve the token from localStorage
  if (!token) {
    return Promise.reject("Error: No token found"); // Handle missing token
  }
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json(); // Ensure the updated card is returned
  });
};
