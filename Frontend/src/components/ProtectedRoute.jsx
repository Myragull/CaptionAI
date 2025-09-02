// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait for auth check

  if (!user) return <Navigate to="/login" replace />; // redirect if not logged in

  return children; // render protected content
};

export default ProtectedRoute;
