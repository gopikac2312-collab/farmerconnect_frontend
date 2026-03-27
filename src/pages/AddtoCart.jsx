import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/AddtoCart.css";

export default function AddToCart() {
  const { id } = useParams();
  console.log("Route id:", id);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  useEffect(() => {
   const fetchProduct = async () => {
  try {
    const response = await API.get(`/products/${id}/`);
    setProduct(response.data);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
};

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      alert("You must be logged in to add to cart");
      return;
    }

    if (!product) {
      alert("Product not loaded yet!");
      return;
    }

    const qty = Number(quantity);
    if (qty < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        "cart/add_item/",
        { product: Number(product.id), quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Added to cart!");
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err);
      alert(
        err.response?.data
          ? `Failed to add to cart: ${JSON.stringify(err.response.data)}`
          : "Failed to add to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-to-cart-container">
      <h2 className="add-to-cart-title">Add to Cart</h2>

      {product && <p>{product.name}</p>}

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="add-to-cart-input"
      />

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="add-to-cart-btn"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
