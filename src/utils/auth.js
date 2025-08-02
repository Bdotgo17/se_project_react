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
      if (!res.ok) {
        return res
          .json()
          .then((err) => Promise.reject(`Error: ${err.message || res.status}`));
      }
      return res.json();
    })
    .then((data) => {
      console.log("Token received:", data.token); // Debug log
      localStorage.setItem("jwt", data.token); // Save token to local storage
      return data;
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
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("jwt"); // Clear expired token
        window.location.href = "/login"; // Redirect to login page
      }
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}
