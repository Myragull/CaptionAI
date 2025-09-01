import { GoHome, GoHomeFill } from "react-icons/go";
import { MdBookmarkBorder,MdBookmark } from "react-icons/md";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="CAI-Sidebar-Wrapper h-screen py-4 px-4 border border-amber-200">
      {/* Switch alignment: center (default) → right at xl */}
      <div className="CAI-Content border border-amber-400 max-w-[300px] flex flex-col items-end xl:items-end">
        
        {/* Logo + Nav */}
        <div className="CAI-Top-links border border-amber-100 flex flex-col items-center xl:items-start justify-center">
          <div className="CAI-Logo text-white text-3xl font-bold">CAI</div>
          
          {/* Nav links */}
          <div className="CAI-Nav-Links mt-6 flex flex-col gap-4 items-center xl:items-start justify-center border border-amber-400">
            
            {/* Home */}
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-[#f0eeee] ${
                  isActive ? "text-white" : "text-[#dcdcdc]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <GoHomeFill className="text-3xl" />
                  ) : (
                    <GoHome className="text-3xl" />
                  )}
                  <span className="font-medium hidden xl:inline">Home</span>
                </>
              )}
            </NavLink>

            {/* Bookmarks */}
            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-[#f0eeee] ${
                  isActive ? "text-white" : "text-[#dcdcdc]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <MdBookmark className="text-3xl" />
                  ) : (
                    <MdBookmarkBorder className="text-3xl" />
                  )}
                  <span className="font-medium hidden xl:inline">Bookmarks</span>
                </>
              )}
            </NavLink>

            {/* Settings */}
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-[#f0eeee] ${
                  isActive ? "text-white" : "text-[#dcdcdc]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <IoSettingsOutline className="text-3xl" />
                  ) : (
                    <IoSettingsSharp className="text-3xl" />
                  )}
                  <span className="font-medium hidden xl:inline">Settings</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
