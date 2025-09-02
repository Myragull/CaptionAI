import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* Sidebar: hidden below 450px */}
      <div className="hidden sm:flex w-[450px]">
        <SideBar />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* NavBar: only <450px */}
        <div className="block sm:hidden">
          <NavBar />
        </div>

        {/* Page content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>

        {/* BottomBar: only <450px */}
        <div className="block sm:hidden">
          <BottomBar />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
