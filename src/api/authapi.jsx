import axios from "./axios";
import publicAxios from "./PublicAxios";

// LOGIN
export const loginUser = (data) =>
  publicAxios.post("login/", data);

// REGISTER ✅ FIXED
export const registerUser = (data) =>
  publicAxios.post("register/", data);

// PROFILE
export const getProfile = () =>
  axios.get("profile/");

// EMAIL VERIFY (called automatically via email link)
export const verifyEmail = (uid, token) =>
  axios.get(`verify-email/${uid}/${token}/`);
