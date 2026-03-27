// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function UserLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Hardcoded farmer login
//     if (username === "farmer" && password === "1234") {
//       localStorage.setItem("role", "farmer");
//       navigate("/farmer-dashboard");
//     }
//     // Hardcoded buyer login
//     else if (username === "buyer" && password === "1234") {
//       localStorage.setItem("role", "buyer");
//       navigate("/buyer-dashboard");
//     }
//     // Normal user
//     else if (username === "user" && password === "1234") {
//       localStorage.setItem("role", "user");
//       navigate("/home");
//     }
//     else {
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "#e2f5e2ff",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         className="shadow p-4 rounded"
//         style={{
//           width: "350px",
//           background: "white",
//         }}
//       >
//         <h3 className="text-center mb-4" style={{ color: "#33b048ff" }}>
//           User Login
//         </h3>

//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn w-100"
//             style={{ backgroundColor: "#33b048ff", color: "white" }}
//           >
//             Login
//           </button>
//         </form>

       
//       </div>
//     </div>
//   );
// }

// export default UserLogin;
// src/pages/Login.jsx

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/login.css";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (username === "farmer" && password === "1234") {
//       localStorage.setItem("role", "farmer");
//       navigate("/farmer-dashboard");
//     } else if (username === "buyer" && password === "1234") {
//       localStorage.setItem("role", "buyer");
//       navigate("/buyer-dashboard");
//     } else if (username === "admin" && password === "admin123") {
//       localStorage.setItem("role", "admin");
//       navigate("/admin/dashboard");
//     } else if (username === "user" && password === "1234") {
//       localStorage.setItem("role", "user");
//       navigate("/home");
//     } else {
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div className="vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
//       <div className="card p-4 shadow" style={{ width: 350 }}>
//         <h4 className="text-center text-success mb-3">Login</h4>

//         <form onSubmit={handleLogin}>
//           <input
//             className="form-control mb-3"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button className="btn btn-success w-100">Login</button>
//         </form>

//         {/* Register link */}
//         <div className="text-center mt-3">
//           <span>Don't have an account? </span>
//           <Link
//             to="/register"
//             className="text-success fw-bold text-decoration-none"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/login.css";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     API.post("api/token/", {
//       username: username,
//       password: password,
//     })
//       .then((res) => {
//         localStorage.setItem("access", res.data.access);
//         localStorage.setItem("refresh", res.data.refresh);

//         navigate("/home");
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Invalid username or password");
//       });
//   };

//   return (
//     <div className="vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
//       <div className="card p-4 shadow" style={{ width: 350 }}>
//         <h4 className="text-center text-success mb-3">Login</h4>

//         <form onSubmit={handleLogin}>
//           <input
//             className="form-control mb-3"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="btn btn-success w-100" type="submit">
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <span>Don't have an account? </span>
//           <Link
//             to="/register"
//             className="text-success fw-bold text-decoration-none"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api"; // axios instance
// import jwt_decode from "jwt-decode";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/login.css";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("api/token/", { username, password });
//       const { access, refresh } = res.data;

//       // Save tokens
//       localStorage.setItem("access", access);
//       localStorage.setItem("refresh", refresh);

//       // Decode JWT to get role
//       const decoded = jwt_decode(access);
//       const role = decoded.role;

      


//       // Redirect based on role
//       if (role === "buyer") navigate("/buyer-dashboard");
//       else if (role === "farmer") navigate("/farmer-dashboard");
//       else if (role === "admin") navigate("/admin/dashboard");
//       else navigate("/home");

//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div className="vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
//       <div className="card p-4 shadow" style={{ width: 350 }}>
//         <h4 className="text-center text-success mb-3">Login</h4>

//         <form onSubmit={handleLogin}>
//           <input
//             className="form-control mb-3"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="btn btn-success w-100">
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-3">
//   <span>Don't have an account?</span>
//   <div className="mt-2">
//     <Link
//       to="/register/buyer"
//       className="btn btn-outline-success btn-sm w-100 mb-2"
//     >
//       Register as Buyer
//     </Link>

//     <Link
//       to="/register/farmer"
//       className="btn btn-outline-warning btn-sm w-100"
//     >
//       Register as Farmer
//     </Link>
//   </div>
// </div>

//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";
// import jwt_decode from "jwt-decode";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/login.css";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // ✅ Always use leading slash
//       const res = await API.post("/api/token/", { username, password });

//       const { access, refresh } = res.data;

//       localStorage.setItem("access", access);
//       localStorage.setItem("refresh", refresh);

//       const decoded = jwt_decode(access);
//       console.log("DECODED TOKEN:", decoded);

//       // ✅ Defensive role extraction
//       const role =
//         decoded.role?.toLowerCase() ||
//         decoded.user_type?.toLowerCase() ||
//         (decoded.is_farmer ? "farmer" : null) ||
//         (decoded.is_buyer ? "buyer" : null);

//       console.log("ROLE USED:", role);

//       // ✅ Correct redirect
//       if (role === "buyer") {
//         navigate("/buyer-dashboard");
//       } else if (role === "farmer") {
//         navigate("/farmer-dashboard");
//       } else if (role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/farmer-dashboard");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Invalid username or password");
//     }
//   }

    
  

//   return (
//     <div className="vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
//       <div className="card p-4 shadow" style={{ width: 350 }}>
//         <h4 className="text-center text-success mb-3">Login</h4>

//         <form onSubmit={handleLogin}>
//           <input
//             className="form-control mb-3"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="btn btn-success w-100">
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <span>Don't have an account?</span>
//           <div className="mt-2">
//             <Link
//               to="/register/buyer"
//               className="btn btn-outline-success btn-sm w-100 mb-2"
//             >
//               Register as Buyer
//             </Link>

//             <Link
//               to="/register/farmer"
//               className="btn btn-outline-warning btn-sm w-100"
//             >
//               Register as Farmer
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
  


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";
// import jwt_decode from "jwt-decode";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/login.css";


// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();


//     if (username === "user" && password === "1234") {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.setItem("role", "buyer"); // fake role

//     navigate("/home"); // ✅ Home page
//     return; // ⛔ STOP — backend WILL NOT be called
//   }

//     try {
//       // POST login to backend
//       const res = await API.post("/api/token/", { username, password });
     

//       const { access, refresh } = res.data;

//       // Save tokens
//       localStorage.setItem("access", access);
//       localStorage.setItem("refresh", refresh);

//       // Decode token
//       const decoded = jwt_decode(access);
//       console.log("DECODED TOKEN:", decoded);

//       // Extract role safely
//       const role = decoded.role?.toLowerCase();
//       console.log("ROLE USED:", role);

//       // ✅ SAVE ROLE (VERY IMPORTANT)
//     localStorage.setItem("role", role);

//       // Redirect based on role
//       if (role === "buyer") navigate("/buyer-dashboard");
//       else if (role === "farmer") navigate("/farmer-dashboard");
//       else if (role === "admin") navigate("/admin/dashboard");
//       else navigate("/");


//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div className="vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
//       <div className="card p-4 shadow" style={{ width: 350 }}>
//         <h4 className="text-center text-success mb-3">Login</h4>

//         <form onSubmit={handleLogin}>
//           <input
//             className="form-control mb-3"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="btn btn-success w-100">
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <span>Don't have an account?</span>
//           <div className="mt-2">
//             <Link
//               to="/register/buyer"
//               className="btn btn-outline-success btn-sm w-100 mb-2"
//             >
//               Register as Buyer
//             </Link>
//             <Link
//               to="/register/farmer"
//               className="btn btn-outline-warning btn-sm w-100"
//             >
//               Register as Farmer
//             </Link>
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔐 Backend login
      const res = await API.post("/api/token/", { username, password });
      const { access, refresh } = res.data;

      // Save tokens
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // Decode JWT
      const decoded = jwt_decode(access);
      const role = decoded.role?.toLowerCase();

      // Save role
      localStorage.setItem("role", role);

      // 🔁 REDIRECT LOGIC
      if (role === "buyer") {
        navigate("/home");            // ✅ buyer → HOME
      } else if (role === "farmer") {
        navigate("/farmer-dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
      <div className="card p-4 shadow" style={{ width: 350 }}>
        <h4 className="text-center text-success mb-3">Login</h4>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <span>Don't have an account?</span>
          <div className="mt-2">
            <Link
              to="/register/buyer"
              className="btn btn-outline-success btn-sm w-100 mb-2"
            >
              Register as Buyer
            </Link>
            <Link
              to="/register/farmer"
              className="btn btn-outline-warning btn-sm w-100"
            >
              Register as Farmer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
