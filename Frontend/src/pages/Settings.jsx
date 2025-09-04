import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from '../utils/api'
import { successToast } from "../utils/toast";
import { FaArrowLeft } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";


function Settings() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
        try {
      await api.post("/auth/logout");
      setUser(null);
      successToast("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }

  };

  return (
    <div className="logout-wrapper min-h-screen bg-[#16171a] text-white  ">
      <div className="logout-content">

        {/* 🔹 Row 1: Back + Settings title */}
        <div className="flex items-center gap-6 justify-left p-4 border-b border-gray-700 ">
          <Link to="/HomePage/home" className="flex items-center gap-2">
            <FaArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="w-10" /> {/* spacer to center title */}
        </div>

         {/* 🔹 Row 2: Logout */}
      <div className="p-4 border-b border-gray-700 ">
        <button
          onClick={handleLogout}
          className="flex items-center gap-6 text-red-400 hover:text-red-500 transition-colors"
        >
          <BiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      </div>

     
    </div>
  );
}

export default Settings;

