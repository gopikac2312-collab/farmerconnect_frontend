import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BuyerProducts from "./BuyerProducts";
import AddReview from "../components/AddReview";

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleSubmitFeedback = () => {
    // Later connect this to Django API
    console.log({ rating, comment });

    alert("Thank you for your feedback!");
    setShowFeedback(false);
    setRating("");
    setComment("");
  };

  return (
    <div style={pageStyle}>
      {/* PAGE CONTENT */}
      <div style={{ padding: "30px" }}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "35px" }}>🛒</span>
            Buyer Dashboard
          </h2>
        </div>

        {/* OPTIONS BUTTONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/buyer-product">
            <button style={buttonStyle}>Browse Products</button>
          </Link>

          <Link to="/buyer-cart">
            <button style={buttonStyle}>My Cart</button>
          </Link>

          <Link to="/buyer-orders">
            <button style={buttonStyle}>My Orders</button>
          </Link>

          {/* FEEDBACK BUTTON */}
          <button
            style={{ ...buttonStyle, backgroundColor: "#1e88e5" }}
            onClick={() => setShowFeedback(true)}
          >
            Give Feedback
          </button>
        </div>
      </div>

      {/* FEEDBACK POPUP */}
      {showFeedback && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>📝 Share Your Feedback</h3>

            <label>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>

            <textarea
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ ...inputStyle, height: "80px" }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => setShowFeedback(false)} style={cancelBtn}>
                Cancel
              </button>
              <button onClick={handleSubmitFeedback} style={submitBtn}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */
const pageStyle = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#f8f8f8",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "40px",
};

const buttonStyle = {
  backgroundColor: "#33b048ff",
  color: "white",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  width: "220px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "10px",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const cancelBtn = {
  padding: "8px",
  flex: 1,
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

const submitBtn = {
  padding: "8px",
  flex: 1,
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#33b048ff",
  color: "white",
  cursor: "pointer",
};



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import BuyerProducts from "./BuyerProducts"; // make sure this component lists products
// import AddReview from "../components/AddReview";
// import API from "../api"; // assuming you have an axios setup for API calls

// export default function BuyerDashboard() {
//   const navigate = useNavigate();
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [rating, setRating] = useState("");
//   const [comment, setComment] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   const handleSubmitFeedback = () => {
//     console.log({ rating, comment });
//     alert("Thank you for your feedback!");
//     setShowFeedback(false);
//     setRating("");
//     setComment("");
//   };

//   // Fetch products from API
//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/products/"); // adjust endpoint if needed
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Failed to load products", err);
//       alert("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   return (
//     <div style={pageStyle}>
//       <div style={{ padding: "30px" }}>
//         <div style={headerStyle}>
//           <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <span style={{ fontSize: "35px" }}>🛒</span>
//             Buyer Dashboard
//           </h2>
//           <button onClick={handleLogout} style={buttonStyle}>
//             Logout
//           </button>
//         </div>

//         {/* OPTIONS BUTTONS */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
//           <Link to="/buyer-cart">
//             <button style={buttonStyle}>My Cart</button>
//           </Link>

//           <Link to="/buyer-orders">
//             <button style={buttonStyle}>My Orders</button>
//           </Link>

//           <button
//             style={{ ...buttonStyle, backgroundColor: "#1e88e5" }}
//             onClick={() => setShowFeedback(true)}
//           >
//             Give Feedback
//           </button>
//         </div>

//         {/* PRODUCTS SECTION */}
//         <h3>Available Products</h3>
//         {loading ? (
//           <p>Loading products...</p>
//         ) : (
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <BuyerProducts key={product.id} product={product} />
//               ))
//             ) : (
//               <p>No products available.</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* FEEDBACK POPUP */}
//       {showFeedback && (
//         <div style={overlayStyle}>
//           <div style={modalStyle}>
//             <h3>📝 Share Your Feedback</h3>

//             <label>Rating</label>
//             <select
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               style={inputStyle}
//             >
//               <option value="">Select</option>
//               <option value="1">⭐</option>
//               <option value="2">⭐⭐</option>
//               <option value="3">⭐⭐⭐</option>
//               <option value="4">⭐⭐⭐⭐</option>
//               <option value="5">⭐⭐⭐⭐⭐</option>
//             </select>

//             <textarea
//               placeholder="Write your experience..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               style={{ ...inputStyle, height: "80px" }}
//             />

//             <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//               <button onClick={() => setShowFeedback(false)} style={cancelBtn}>
//                 Cancel
//               </button>
//               <button onClick={handleSubmitFeedback} style={submitBtn}>
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* STYLES REMAIN SAME */
// // /* STYLES */
// const pageStyle = {
//   width: "100vw",
//   height: "100vh",
//   backgroundColor: "#f8f8f8",
// };

// const headerStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "40px",
// };

// const buttonStyle = {
//   backgroundColor: "#33b048ff",
//   color: "white",
//   padding: "12px 20px",
//   borderRadius: "8px",
//   cursor: "pointer",
//   border: "none",
//   fontSize: "16px",
//   fontWeight: "bold",
//   width: "220px",
// };

// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   backgroundColor: "rgba(0,0,0,0.4)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const modalStyle = {
//   backgroundColor: "white",
//   padding: "25px",
//   borderRadius: "10px",
//   width: "320px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
// };

// const inputStyle = {
//   padding: "8px",
//   borderRadius: "6px",
//   border: "1px solid #ccc",
// };

// const cancelBtn = {
//   padding: "8px",
//   flex: 1,
//   borderRadius: "6px",
//   border: "none",
//   cursor: "pointer",
// };

// const submitBtn = {
//   padding: "8px",
//   flex: 1,
//   borderRadius: "6px",
//   border: "none",
//   backgroundColor: "#33b048ff",
//   color: "white",
//   cursor: "pointer",
// };