import axios from "./axios";

// CREATE PAYMENT
export const createPayment = (order_id) =>
  axios.post("payment/create/", { order_id });

// VERIFY PAYMENT
export const verifyPayment = (data) =>
  axios.post("payment/verify/", data);
