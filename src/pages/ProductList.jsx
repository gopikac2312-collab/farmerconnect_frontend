import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("products/my_products/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // 🔹 Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`products/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      // update UI
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={pageStyle}>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>👨‍🌾 My Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div style={gridStyle}>
            {products.map((p) => (
              <div key={p.id} style={cardStyle}>
                <h4>{p.name}</h4>
                <p>Price: ₹{p.price}</p>
                <p>Stock: {p.stock}</p>

                <div style={btnRow}>
                  <Link to={`/edit-product/${p.id}`}>
                    <button style={editBtn}>Edit</button>
                  </Link>

                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: "#f5f7fa",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
};

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const editBtn = {
  backgroundColor: "#007bff",
  border: "none",
  padding: "6px 12px",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  backgroundColor: "red",
  border: "none",
  padding: "6px 12px",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};
