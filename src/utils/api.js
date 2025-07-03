const baseUrl = "http://localhost:3002/items";

// Fetch all clothing items
export const getItems = () => {
  console.log("Fetching items from:", baseUrl); // Debug log

  return fetch(baseUrl)
    .then((res) => {
      if (!res.ok) {
        console.error("Response error:", res);
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Failed to fetch items:", err);
    });
};

// Add a new clothing item
export const addItem = (name, imageUrl, weather, _id) => {
  const payload = { _id, name, imageUrl, weather };
  console.log("Payload being sent to server:", payload); // Debug log

  return fetch("http://localhost:3002/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((errorText) => {
          console.error("Server error response (raw):", errorText);
          throw new Error(`Error: ${res.status} - ${errorText}`);
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log("Item successfully added:", data); // Debug log for success
      return data;
    })
    .catch((err) => {
      console.error("Failed to add item:", err);
      throw err; // Re-throw the error for further handling
    });
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Failed to delete item:", err);
    });
};
