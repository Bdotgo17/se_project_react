const baseUrl = "http://localhost:3001/items";

// Fetch all clothing items
export const getItems = () => {
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
export const addItem = (name, imageUrl, weather) => {
  console.log("Adding item:", { name, imageUrl, weather });

  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Response error:", res);
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Failed to add item:", err);
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
