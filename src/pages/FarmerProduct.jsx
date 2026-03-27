import { useEffect, useState } from "react";
import API from "../api";
import "./FarmerProduct.css";

export default function FarmerProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await API.get("api/products/my_products/", {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price || !stock) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post(
        "api/products/",
        { name, price, stock },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setName("");
      setPrice("");
      setStock("");
      fetchProducts(); // 🔁 refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="farmer-product">
      <h2>My Products</h2>

      {/* ➕ Add Product */}
      <div className="add-product">
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* 📦 Product List */}
      {products.length === 0 && <p>No products found.</p>}

      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
