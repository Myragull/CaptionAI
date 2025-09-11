import axios from "axios";

// Get the API URL from environment variables, with fallback for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add request interceptor to handle common headers
api.interceptors.request.use(
  (config) => {
    // You could add common headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, redirecting to login...");
      // You could add auto-redirect to login here if needed
    }
    return Promise.reject(error);
  }
);

export default api;
