// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";



// export default function ProtectedRoute({ children }) {
// const { user } = useContext(AuthContext);


// if (!user) return <Navigate to="/login" />;
// axios.put(`
//     "http://127.0.0.1:8000/products/",
// /${id}/`, formData, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   }
// })



// return children;
// }

import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
