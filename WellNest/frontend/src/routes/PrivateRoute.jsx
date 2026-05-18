import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait until auth is loaded
  if (loading) return null;

  // 🔐 Protect route
  return user?.token ? children : <Navigate to="/login" replace />;
}
