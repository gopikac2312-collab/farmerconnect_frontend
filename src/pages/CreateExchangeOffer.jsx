import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateExchangeOffer() {
  const [form, setForm] = useState({
    product: "",
    quantity: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("exchange-offers/", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      alert("Exchange offer submitted successfully");
      navigate("/farmer/exchange-offers");
    } catch (err) {
      console.error(err);
      alert("Failed to submit exchange offer");
    }
  };

  return (
    <div className="container">
      <h2>Create Exchange Offer</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="product"
          placeholder="Product ID"
          value={form.product}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message (optional)"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit">Submit Offer</button>
      </form>
    </div>
  );
}
