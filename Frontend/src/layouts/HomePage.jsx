import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#16171a] text-white flex max-w-[900px] mx-auto border-r border-r-[#2c2e33]">
  
      {/* Sidebar: hidden below 450px */}
      <div className="Wrapper hidden sm:flex  items-center justify-end">
        <SideBar />
      </div>

      {/* Main Area */}
      <div className="flex flex-col  flex-2 overflow-hidden">
        
        {/* NavBar: only <450px */}
        <div className="block top-0 fixed sm:hidden ">
          <NavBar />
        </div>

        {/* Page content */}
        <main className="flex-1  ">
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
