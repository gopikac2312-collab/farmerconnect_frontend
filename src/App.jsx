// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx"; // Make sure Layout.jsx exists in src/

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
