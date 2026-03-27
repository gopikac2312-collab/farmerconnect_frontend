import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/BuyerProductDetail.css";
// Import the CSS

export default function BuyerProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    API.get(`products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Product not found"));
  }, [id]);

  const addToCart = async () => {
    if (qty < 1 || qty > product.stock) {
      alert("Invalid quantity");
      return;
    }

    await API.post("cart/add-item/", {
      product: id,
      quantity: qty,
    });

    alert("Added to cart");
    navigate("/buyer-cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="buyer-product-detail">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">Price: ₹{product.price}</p>
      <p className="stock">Available Stock: {product.stock}</p>

      <input
        type="number"
        min="1"
        max={product.stock}
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
