// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from '../utils/api'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores user info
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me"); // ✅ no hardcoded baseURL
        setUser(res.data.user); // backend should return { user: {...} }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
