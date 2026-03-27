// import { Link } from "react-router-dom";
// // import Navbar from "../components/Navbar";

// export default function Products() {
//   return (
//     <>
    

//       {/* Full Page Container */}
//       <div
//         style={{
//           minHeight: "100vh",           // full page height
//           width: "99vw",               // full page width
//           backgroundColor: "#f1f3f1ff",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           paddingTop: "80px",           // space below navbar
//         }}
//       >
//         {/* Page Header */}
//         <div
//           className="container"
//           style={{
//             maxWidth: "900px",
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h2>My Products</h2>

//             <Link to="/AddProducts">
//               <button className="btn btn-success">AddProduct</button>
//             </Link>
//           </div>

//           <p className="text-muted">
//             Here you can view, edit or delete your products.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is a short description of Product 1.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a short description of Product 2.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is a short description of Product 3.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is a short description of Product 4.",
      image: "https://via.placeholder.com/300x200",
    },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: `Product ${products.length + 1}`,
        description: "This is a short description of the product.",
        image: "https://via.placeholder.com/300x200",
      },
    ]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const editProduct = (id) => {
    alert(`Edit product ID: ${id}`);
  };

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        body {
          background-color: #eef7ee;
          font-family: Arial, sans-serif;
        }

        .product-container {
          max-width: 1100px;
          margin: auto;
          padding: 40px 20px;
        }

        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .product-header h1 {
          font-size: 32px;
          font-weight: bold;
        }

        .add-btn {
          background-color: #198754;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
        }

        .add-btn:hover {
          background-color: #157347;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
        }

        .product-card h3 {
          margin: 12px 0 6px;
        }

        .product-card p {
          font-size: 14px;
          color: #555;
        }

        .product-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .btn {
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          background: transparent;
        }

        .btn.edit {
          border: 1px solid #0d6efd;
          color: #0d6efd;
        }

        .btn.edit:hover {
          background: #0d6efd;
          color: white;
        }

        .btn.delete {
          border: 1px solid #dc3545;
          color: #dc3545;
        }

        .btn.delete:hover {
          background: #dc3545;
          color: white;
        }
      `}</style>

      {/* JSX */}
      <div className="product-container">
        <div className="product-header">
          <h1>My Products</h1>
           <button
            className="add-btn"
            onClick={() => navigate("/add-products")}>
          
            + Add Product
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>

             <div className="product-actions">
  <button
    className="btn edit"
    onClick={() => navigate(`/edit-product/${product.id}`)}
  >
    Edit
  </button>

                <button
                  className="btn delete"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;




