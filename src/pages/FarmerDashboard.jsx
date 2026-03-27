
//   import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api";

// export default function FarmerDashboard() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     stock: "",
//   });

//   // Fetch farmer products
//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("products/my_products/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//         },
//       });
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   // Handle form input
//   const handleChange = (e) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

//   // Add product
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post(
//         "products/",
//         newProduct,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );
//       setNewProduct({ name: "", price: "", stock: "" });
//       loadProducts();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add product");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">👩‍🌾 Farmer Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </header>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <Link to="/buyer-orders" className="dashboard-card">🛒 Orders</Link>
//         <Link to="/farmer-earnings" className="dashboard-card">💰 Earnings</Link>
//         <Link to="/reviews" className="dashboard-card">⭐ Feedback</Link>
        
//       </div>

//       {/* Add Product */}
//       <section className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

//         <form
//           onSubmit={handleAddProduct}
//           className="grid md:grid-cols-4 gap-3"
//         >
//           <input
//             className="border p-2 rounded"
//             name="name"
//             placeholder="Product name"
//             value={newProduct.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             className="border p-2 rounded"
//             name="price"
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={handleChange}
//             required
//           />
//           <input
//             className="border p-2 rounded"
//             name="stock"
//             type="number"
//             placeholder="Stock"
//             value={newProduct.stock}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             ➕ Add Product
//           </button>
//         </form>
//       </section>

//       {/* Products */}
//       <section className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">My Products</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : products.length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           <div className="grid md:grid-cols-3 gap-4">
//             {products.map((p) => (
//               <div key={p.id} className="border p-4 rounded shadow-sm">
//                 <h3 className="font-semibold">{p.name}</h3>
//                 <p>₹ {p.price}</p>
//                 <p>Stock: {p.stock}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api";

// export default function FarmerDashboard() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     image: null, // Added for image upload
//   });

//   // Fetch farmer products
//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("products/my_products/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//         },
//       });
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setNewProduct({ ...newProduct, image: e.target.files[0] });
//     } else {
//       setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//     }
//   };

//   // Add product
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", newProduct.name);
//       formData.append("price", parseFloat(newProduct.price));
//       formData.append("stock", parseInt(newProduct.stock));
//       if (newProduct.image) {
//         formData.append("image", newProduct.image);
//       }

//       await API.post("products/", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setNewProduct({ name: "", price: "", stock: "", image: null });
//       loadProducts();
//       alert("Product added successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add product");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">👩‍🌾 Farmer Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </header>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <Link to="/buyer-orders" className="dashboard-card">🛒 Orders</Link>
//         <Link to="/farmer-earnings" className="dashboard-card">💰 Earnings</Link>
//         <Link to="/reviews" className="dashboard-card">⭐ Feedback</Link>
//       </div>

//       {/* Add Product */}
//       <section className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

//         <form onSubmit={handleAddProduct} className="grid md:grid-cols-5 gap-3">
//           <input
//             className="border p-2 rounded"
//             name="name"
//             placeholder="Product name"
//             value={newProduct.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             className="border p-2 rounded"
//             name="price"
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={handleChange}
//             required
//           />
//           <input
//             className="border p-2 rounded"
//             name="stock"
//             type="number"
//             placeholder="Stock"
//             value={newProduct.stock}
//             onChange={handleChange}
//             required
//           />
//           <input
//             className="border p-2 rounded"
//             name="image"
//             type="file"
//             accept="image/*"
//             onChange={handleChange}
//           />
//           <button
//             type="submit"
//             className="bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             ➕ Add Product
//           </button>
//         </form>
//       </section>

//       {/* Products */}
//       <section className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">My Products</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : products.length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           <div className="grid md:grid-cols-3 gap-4">
//             {products.map((p) => (
//               <div key={p.id} className="border p-4 rounded shadow-sm">
//                 {p.image && (
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="w-full h-32 object-cover mb-2 rounded"
//                   />
//                 )}
//                 <h3 className="font-semibold">{p.name}</h3>
//                 <p>₹ {p.price}</p>
//                 <p>Stock: {p.stock}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/FarmerDashboard.css";



export default function FarmerDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });

  // Fetch farmer products
  const loadProducts = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", parseFloat(newProduct.price));
      formData.append("stock", parseInt(newProduct.stock));
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      await API.post("products/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNewProduct({ name: "", price: "", stock: "", image: null });
      loadProducts();
      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`products/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
     <header className="farmer-header">
  <h1 className="farmer-title">👩‍🌾 Farmer Dashboard</h1>
  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>
</header>


      {/* Quick Actions */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link to="/buyer-orders" className="dashboard-card">🛒 Orders</Link>
        <Link to="/farmer-earnings" className="dashboard-card">💰 Earnings</Link>
        <Link to="/reviews" className="dashboard-card">⭐ Feedback</Link>
      </div> */}

      {/* Add Product */}
      <section className="section-card">
  <h2 className="section-title">Add New Product</h2>

  <form onSubmit={handleAddProduct} className="add-product-form">

          <input
            className="border p-2 rounded"
            name="name"
            placeholder="Product name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded"
            name="price"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded"
            name="stock"
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded hover:bg-green-600"
          >
            ➕ Add Product
          </button>
        </form>
      </section>

      {/* Products */}
    <section className="section-card">
  <h2 className="section-title">My Products</h2>

  {loading ? (
    <p>Loading...</p>
  ) : products.length === 0 ? (
    <p>No products found</p>
  ) : (
    <div className="farmer-products-grid">
      {products.map((p) => (
        <div key={p.id} className="farmer-product-card">

          {/* Product Image */}
         <div className="product-image-wrapper">
            <img
  src={
    p.image
      ? `http://127.0.0.1:8000${p.image}`
      : "https://via.placeholder.com/300x200"
  }
  alt={p.name}
  className="product-image"
/>

          </div>
          {/* Product Info */}
          <div className="product-name">{p.name}</div>
          <div className="product-meta">₹ {p.price}</div>
          <div className="product-meta">Stock: {p.stock}</div>

          {/* Actions */}
          <div className="product-actions">
            <button
              className="edit-btn"
              onClick={() =>
                navigate(`/edit-product/${p.id}`, { state: p })

              }
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  )}
</section>

    </div>
  );
}
