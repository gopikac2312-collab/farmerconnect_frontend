// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";
// import "bootstrap/dist/css/bootstrap.min.css";

// const FarmerRegister = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "farmer", // fixed role
//   });

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await API.post("register/", formData);
//       alert(res.data.message || "Registration successful");
//       navigate("/login");
//     } catch (err) {
//       alert(
//         err.response?.data?.error ||
//         err.response?.data?.detail ||
//         "Registration failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
//       <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: 400 }}>
        
//         <h3 className="text-center text-success mb-3">
//           Farmer Registration
//         </h3>

//         <form onSubmit={handleSubmit}>
//           <input
//             className="form-control mb-3"
//             name="username"
//             placeholder="Username"
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />

//           <button
//             className="btn btn-success w-100"
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Create Farmer Account"}
//           </button>
//         </form>

//         <p className="text-center mt-3 mb-0">
//           Are you a Buyer?{" "}
//           <Link to="/register/buyer">Register here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FarmerRegister;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import publicAxios from "../api/PublicAxios"; // 👈 use publicAxios

const FarmerRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await publicAxios.post("register/", formData); // 👈 use publicAxios
      alert(res.data.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: 400 }}>
        <h3 className="text-center text-success mb-3">Farmer Registration</h3>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" name="username" placeholder="Username" onChange={handleChange} required />
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Registering..." : "Create Farmer Account"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Are you a Buyer? <Link to="/register/buyer">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default FarmerRegister;
