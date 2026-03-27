import React, { useEffect, useState } from "react";
import API from "../api";

export default function FarmerProduct() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // Load products
  const loadProducts = () => {
    API.get("my-products/") // endpoint for farmer's products
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(loadProducts, []);

  // Add new product
  const handleAddProduct = async () => {
    try {
      await API.post("products/", newProduct);
      setNewProduct({ name: "", price: "", stock: "" });
      loadProducts();
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  // Edit product
  const handleEditProduct = async () => {
    try {
      await API.put(`products/${editingProduct.id}/`, editingProduct);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      console.error("Failed to edit product", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`products/${id}/`);
      loadProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  // Update stock
  const handleUpdateStock = async (id, stock) => {
    try {
      await API.post(`products/${id}/update-stock/`, { stock });
      loadProducts();
    } catch (err) {
      console.error("Failed to update stock", err);
    }
  };

  // Toggle active/inactive
  const handleToggleActive = async (id, isActive) => {
    try {
      await API.post(`products/${id}/toggle-active/`, { is_active: isActive });
      loadProducts();
    } catch (err) {
      console.error("Failed to toggle active status", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>

      {/* Add New Product Form */}
      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add New Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border px-2 py-1 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border px-2 py-1 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="border px-2 py-1 rounded mr-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className={`border p-4 rounded shadow flex flex-col justify-between ${
              !p.is_active ? "opacity-50" : ""
            }`}
          >
            {/* Edit Modal or Inline */}
            {editingProduct && editingProduct.id === p.id ? (
              <div>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="border px-2 py-1 rounded mb-2 w-full"
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="border px-2 py-1 rounded mb-2 w-full"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleEditProduct}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold">{p.name}</h4>
                <p>Price: ₹{p.price}</p>
                <p>Stock: {p.stock}</p>
                <p>Status: {p.is_active ? "Active" : "Inactive"}</p>

                {/* Stock input */}
                <input
                  type="number"
                  min="0"
                  defaultValue={p.stock}
                  onBlur={(e) => handleUpdateStock(p.id, Number(e.target.value))}
                  className="border px-2 py-1 rounded mt-2 w-full"
                />

                {/* Action Buttons */}
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(p.id, !p.is_active)}
                    className={`px-2 py-1 rounded text-white ${
                      p.is_active ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {p.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
