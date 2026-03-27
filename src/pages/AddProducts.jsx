import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/products/", {
        name,
        price,
        quantity,
        description,
      });

      alert("Product added successfully!");
      navigate("/products");
    } catch (err) {
      alert("Error adding product");
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "40rem", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4">Add Product</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success w-100">
              Save Product
            </button>

            <Link to="/products" className="btn btn-outline-secondary w-100">
              View Products
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;


