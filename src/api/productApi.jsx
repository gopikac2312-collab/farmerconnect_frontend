
import axios from "./axios";

// PUBLIC
export const getProducts = () =>
  axios.get("products/");

// FARMER
export const getMyProducts = () =>
  axios.get("products/my_products/");

export const addProduct = (data) =>
  axios.post("products/", data);

export const updateProduct = (id, data) =>
  axios.put(`products/${id}/`, data);

export const deleteProduct = (id) =>
  axios.delete(`products/${id}/`);
