import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/BuyerProducts.css";

export default function BuyerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 NEW
  const navigate = useNavigate();

  useEffect(() => {
    API.get("products/")
      .then((res) => {
        setProducts(res.data);
        const initialQuantities = {};
        res.data.forEach((p) => (initialQuantities[p.id] = 1));
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🔍 Filter products by name
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleQtyChange = (productId, value) => {
    if (value < 1) value = 1;
    setQuantities({ ...quantities, [productId]: value });
  };

  if (loading) return <p className="text-center mt-20">Loading products...</p>;

  return (
    <div className="buyer-page">
      <h2 className="buyer-title">Available Products</h2>

      {/* 🔍 Search Bar */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "24px"
      }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)", fontSize: "18px", color: "#888"
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 16px 10px 40px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          {/* Clear button */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute", right: "10px", top: "50%",
                transform: "translateY(-50%)", background: "none",
                border: "none", cursor: "pointer", fontSize: "16px", color: "#888"
              }}
            >✕</button>
          )}
        </div>
      </div>

      {/* Result count */}
      {searchQuery && (
        <p style={{ textAlign: "center", color: "#666", marginBottom: "16px", fontSize: "14px" }}>
          {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
        </p>
      )}

      {/* No results */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>
          No products found matching "{searchQuery}"
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={p.image || "https://via.placeholder.com/300x200"}
                  alt={p.name}
                  className="product-image"
                />
              </div>
              <div className="product-body">
                <div className="product-name">{p.name}</div>
                <div className="product-price">₹{p.price}</div>
                <div className="product-stock">Stock: {p.stock}</div>
                <div className="qty-box">
                  <span>Qty</span>
                  <input
                    type="number"
                    min="1"
                    max={p.stock}
                    value={quantities[p.id]}
                    onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value))}
                  />
                </div>
                <div className="card-actions">
                  <button className="buy-btn" onClick={() => navigate(`/payment`)}>
                    Buy
                  </button>
                  <button className="view-btn" onClick={() => navigate(`/add-to-cart/${p.id}`)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}