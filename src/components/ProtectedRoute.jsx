// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const userRole = localStorage.getItem("role");

//   if (!userRole) return <Navigate to="/login" />;
//   if (role && userRole !== role) return <Navigate to="/login" />;

//   return children;
// }


import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("access");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwt_decode(token);
    const userRole = decoded.role?.toLowerCase();

    if (role && userRole !== role) return <Navigate to="/login" />;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" />;
  }

  return children;
}
