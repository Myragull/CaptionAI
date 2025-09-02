import { GoHome, GoHomeFill } from "react-icons/go";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function SideBar() {
  const links = [
  { to: "/homepage/home", label: "Home", icon: GoHome, iconActive: GoHomeFill },
  { to: "/homepage/bookmarks", label: "Bookmarks", icon: MdBookmarkBorder, iconActive: MdBookmark },
  { to: "/homepage/settings", label: "Settings", icon: IoSettingsOutline, iconActive: IoSettingsSharp },
];


  return (
    <div className="h-screen py-4 px-4 border-r border-r-[#2c2e33] flex flex-col items-center xl:items-start">
      <div className="text-white text-3xl font-bold mb-6">CAI</div>

      <div className="flex flex-col gap-6 items-center xl:items-start">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 hover:text-[#f0eeee] ${
                isActive ? "text-white" : "text-[#dcdcdc]"
              }`
            }
          >
            {({ isActive }) => {
              const Icon = isActive ? link.iconActive : link.icon;
              return (
                <>
                  <Icon className="text-4xl" />
                  <span className="font-semibold hidden xl:inline text-2xl">{link.label}</span>
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
