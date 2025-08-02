const BASE_URL = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function getItems() {
  return fetch(`${BASE_URL}/items`) // Use BASE_URL and append /items
    .then((res) => {
      console.log("Raw response from getItems:", res);
      return checkResponse(res);
    })
    .then((data) => {
      console.log("Parsed items:", data);
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
  console.log("Payload being sent to server:", payload); // Debug log

  return fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      console.log("Raw response from addItem:", res);
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    })
    .then((data) => {
      console.log("Added item:", data);
      return data;
    });
}

export function deleteItem(id) {
  const token = localStorage.getItem("jwt"); // Retrieve the token from local storage
  console.log("ID being passed to deleteItem:", id); // Debug log
  console.log("JWT token:", token); // Debug log

  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("Raw response from deleteItem:", res); // Debug log
      return checkResponse(res);
    })
    .catch((err) => {
      console.error("Error in deleteItem:", err); // Debug log
      throw err; // Re-throw the error for further handling
    });
}

export function addCardLike(id) {
  const token = localStorage.getItem("jwt"); // Retrieve the token from local storage
  return fetch(`${BASE_URL}/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function removeCardLike(id) {
  const token = localStorage.getItem("jwt"); // Retrieve the token from local storage
  console.log("ID passed to removeCardLike:", id); // Debug log
  console.log("JWT token:", token); // Debug log

  return fetch(`${BASE_URL}/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("Raw response from removeCardLike:", res); // Debug log
      return checkResponse(res);
    })
    .catch((err) => {
      console.error("Error in removeCardLike:", err); // Debug log
    });
}
