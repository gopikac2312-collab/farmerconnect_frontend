// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import Navbar from "../components/Navbar";

// export default function Order() {
//   const { id } = useParams(); // product id
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [qty, setQty] = useState(1);

//   useEffect(() => {
//     // Later replace with API GET /products/:id
//     const sampleProduct = {
//       id: id,
//       name: "Tomato",
//       price: 30,
//       description: "Fresh organic tomatoes directly from farmers.",
//     };

//     setProduct(sampleProduct);
//   }, [id]);

//   const handlePlaceOrder = () => {
//     alert("Order placed successfully!");
//     navigate("/buyer-orders");
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div style={pageStyle}>
     

//       <div style={container}>
//         <div style={card}>
//           <h2>{product.name}</h2>
//           <p style={{ color: "#555" }}>{product.description}</p>

//           <div style={{ marginTop: "20px" }}>
//             <label style={{ fontWeight: "bold" }}>Quantity:</label>
//             <input
//               type="number"
//               min="1"
//               value={qty}
//               onChange={(e) => setQty(e.target.value)}
//               style={inputQty}
//             />
//           </div>

//           <h3 style={{ marginTop: "20px" }}>
//             Total Price: <span style={{ color: "green" }}>₹{qty * product.price}</span>
//           </h3>

//           <button style={orderBtn} onClick={handlePlaceOrder}>
//             🛒 Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- STYLES ---------- */

// const pageStyle = {
//   width: "100vw",
//   minHeight: "100vh",
//   backgroundColor: "#f4f6f9",
// };

// const container = {
//   display: "flex",
//   justifyContent: "center",
//   padding: "40px",
// };

// const card = {
//   width: "450px",
//   background: "white",
//   padding: "30px",
//   borderRadius: "15px",
//   boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
// };

// const inputQty = {
//   width: "80px",
//   marginLeft: "10px",
//   padding: "5px",
//   borderRadius: "6px",
//   border: "1px solid #ccc",
// };

// const orderBtn = {
//   marginTop: "30px",
//   backgroundColor: "#0f9d26",
//   color: "white",
//   padding: "12px",
//   border: "none",
//   borderRadius: "10px",
//   width: "100%",
//   fontWeight: "bold",
//   cursor: "pointer",
//   fontSize: "18px",
// };


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function Order() {
  const { id } = useParams(); // from /order/:id
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        // ✅ Add leading slash
        const res = await API.get(`/order/products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handlePlaceOrder = async () => {
    if (!product) return;

    try {
      await API.post(
        "/orders/", // ✅ leading slash
        { product: product.id, quantity: qty },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` } }
      );
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <img src={product.image} alt={product.name} width={200} />
      <input
        type="number"
        value={qty}
        min={1}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
