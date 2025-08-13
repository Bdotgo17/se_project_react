import { BASE_URL } from "../utils/constants";
import { checkResponse } from "./api";

export function signup(name, avatar, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export function signin(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse) // Use the centralized checkResponse function
    .then((data) => {
      if (!data.token) {
        throw new Error("Token is missing from the response");
      }
      localStorage.setItem("jwt", data.token); // Save token to local storage
      return data; // Return the full response data
    })
    .catch((err) => {
      console.error("Signin failed:", err); // Log the error
      throw err; // Re-throw the error for further handling
    });
}

export const onSignOut = () => {
  localStorage.removeItem("jwt"); // Example: Remove token from localStorage
};
