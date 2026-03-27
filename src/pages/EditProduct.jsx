import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Editproduct.css";
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const token = localStorage.getItem("access");

  // 🔹 Load product details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          description: res.data.description || "",
          price: res.data.price || "",
          stock: res.data.stock || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load product");
        setLoading(false);
      });
  }, [id, token]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit updated product
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://127.0.0.1:8000/products/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Product updated successfully");
        navigate("/farmer-dashboard"); // ✅ correct redirect
      })
      .catch((err) => {
        console.error(err);
        alert("Update failed");
      });
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading product...</p>;
  }
return (
  <div className="edit-product">
    <div className="edit-product-card">
      <h2>Edit Product</h2>

      <form className="edit-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  </div>
);


}

/* ===== Inline Styles ===== */

const pageStyle = {
  minHeight: "100vh",
  padding: "40px",
  backgroundColor: "#f5f7fa",
};

const formStyle = {
  maxWidth: "420px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};
