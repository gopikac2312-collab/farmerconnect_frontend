// import React, { useEffect, useState } from "react";
// import API from "../api";
// // import { useNavigate } from "react-router-dom";

// export default function BuyerProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("products/")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.error("Failed to load products", err);
//       });
//   }, []);

//   return (
//     <div className="p-4">
//       <h2>Available Products</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {products.map((p) => (
//           <div key={p.id} className="product-card border p-4 rounded shadow">
//             <h4 className="font-semibold">{p.name}</h4>
//             <p>Price: ₹{p.price}</p>
//             <p>Available: {p.quantity}</p>

//             <div className="flex gap-2 mt-3">
//               {/* ORDER BUTTON */}
//               <button
//                 onClick={() => navigate(`/order/${p.id}`)}
//                 className="px-4 py-2 rounded text-white bg-green-600"
//               >
//                 Order
//               </button>

//               {/* OPTIONAL CART BUTTON */}
//               <button
//                 disabled={p.quantity === 0}
//                 className={`px-4 py-2 rounded text-white ${
//                   p.quantity === 0
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-500"
//                 }`}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function BuyerProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("products/")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2>Available Products</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {products.map((p) => (
//           <div key={p.id} className="border p-4 rounded shadow">
//             <h4>{p.name}</h4>
//             <p>₹{p.price}</p>
//             <p>Stock: {p.stock}</p>
//             <p>⭐ {p.rating || "No ratings"}</p>

//             <button
//               className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
//               onClick={() => navigate(`/buyerproductdetails/${p.id}`)}
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function BuyerProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("products/")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center">Available Products</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((p) => (
//           <div
//             key={p.id}
//             className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//           >
//             {/* Product Image */}
//             {/* <img src={p.image ? `http://localhost:8000${p.image}` : "https://via.placeholder.com/300x200"}alt={p.name} 
//             className="w-full h-48 object-cover"/> */}

//             <img
//             src={p.image ? p.image : "/placeholder.png"}
//           alt={p.name}
//           style={{ width: "200px", height: "150px", objectFit: "cover" }}
//          />



//             <div className="p-4">
//               <h4 className="text-lg font-semibold mb-2">{p.name}</h4>
//               <p className="text-gray-700 mb-1">Price: ₹{p.price}</p>
//               <p className="text-gray-700 mb-1">Stock: {p.stock}</p>
//               <p className="text-yellow-500 mb-3">⭐ {p.rating || "No ratings"}</p>

//              <button
//   className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
//   onClick={() => navigate(`/buyerproductdetails/${p.id}`)}
// >
//   View Details
// </button>



//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/BuyerProducts.css";



export default function BuyerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get("products/")
      .then((res) => {
        setProducts(res.data);
        // Initialize quantity state for each product
        const initialQuantities = {};
        res.data.forEach((p) => (initialQuantities[p.id] = 1));
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleQtyChange = (productId, value) => {
    if (value < 1) value = 1;
    setQuantities({ ...quantities, [productId]: value });
  };

  const handleBuyNow = (product) => {
    const qty = quantities[product.id];
    // For now, just log or navigate to cart/checkout page
    console.log("Buying", product.name, "Qty:", qty);
    // Example: navigate to checkout with state
    navigate("/checkout", { state: { product, qty } });
  };

  if (loading) return <p className="text-center mt-20">Loading products...</p>;

  return (
  <div className="buyer-page">
    <h2 className="buyer-title">Available Products</h2>

    <div className="product-grid">
      {products.map((p) => (
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
                onChange={(e) =>
                  handleQtyChange(p.id, parseInt(e.target.value))
                }
              />
            </div>

            <div className="card-actions">
              <button className="buy-btn" onClick={() =>navigate(`/payment`)}>
                Buy
              </button>
              {/* <button
                className="view-btn"
                onClick={() =>
                  navigate(`/buyerproductdetails/${p.id}`, { state: p })
                }
              >
                View
              </button> */}

              <button
  className="view-btn"
  onClick={() => navigate(`/add-to-cart/${p.id}`)}
>
  Add to Cart
</button>

            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
);

}
