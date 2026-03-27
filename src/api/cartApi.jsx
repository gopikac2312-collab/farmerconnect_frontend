import axios from "./axios";

const getToken = () => localStorage.getItem("access"); // your JWT token

export const getCart = () =>
  axios.get("cart/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const addToCart = (data) =>
  axios.post("cart/add/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const removeFromCart = (data) =>
  axios.post("cart/remove/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const checkout = () =>
  axios.post("cart/checkout/", {}, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

