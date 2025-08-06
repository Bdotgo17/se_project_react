import { BASE_URL } from "./constants";

export function signup(name, avatar, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

export function signin(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      // Check if the response is not OK
      if (!res.ok) {
        return res
          .json()
          .then((err) => Promise.reject(`Error: ${err.message || res.status}`));
      }
      return res.json(); // Parse the response JSON
    })
    .then((data) => {
      if (!data.token) {
        throw new Error("Token is missing from the response");
      }
      console.log("Token received:", data.token); // Debug log
      localStorage.setItem("jwt", data.token); // Save token to local storage
      return data; // Return the full response data
    })
    .catch((err) => {
      console.error("Signin failed:", err); // Log the error
      throw err; // Re-throw the error for further handling
    });
}

window.signin = signin;

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("Raw response from checkToken:", res); // Debug log
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("jwt"); // Clear expired token
          window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Parsed user data from checkToken:", data); // Debug log
      return data;
    })
    .catch((err) => {
      console.error("Error in checkToken:", err);
      throw err;
    });
}

