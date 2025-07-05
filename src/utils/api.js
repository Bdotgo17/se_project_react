const baseUrl = "http://localhost:3001/items";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Fetch all clothing items
export function getItems() {
  return fetch(baseUrl).then(checkResponse);
}

// Add a new clothing item
export function addItem(name, imageUrl, weather, _id) {
  const payload = { _id, name, imageUrl, weather };
  console.log("Payload being sent to server:", payload); // Debug log

  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse);
}

export function deleteItem(id) {
  console.log("ID being passed to deleteItem:", id); // Debug log
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}
