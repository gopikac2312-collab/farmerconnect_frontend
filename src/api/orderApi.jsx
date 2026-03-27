import axios from "./axios";

export const getOrders = () =>
  axios.get("orders/");

export const getOrderDetail = (id) =>
  axios.get(`orders/${id}/`);

export const updateOrderStatus = (id, status) =>
  axios.post(`orders/${id}/update_status/`, { status });
