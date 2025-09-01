import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Custom Success Toast Style
export const successToast = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    style: {
      background: "#16171a", // Dark background
      color: "#dcdcdc", // Custom text color (green)
      border: "1px solid #2c2e33",
      fontWeight: "600",
      fontSize: "14px",
    },
    icon: "✅", // Custom icon
  });
