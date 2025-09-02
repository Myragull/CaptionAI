// import { GoHome, GoHomeFill } from "react-icons/go";
// import { MdBookmarkBorder,MdBookmark } from "react-icons/md";
// import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
// import { NavLink } from "react-router-dom";

// function BottomBar() {
//   return (
//     <div className="CAI-BottomBar fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[350px] px-6">
//       {/* Capsule container */}
//       <div className="CAI-Content flex justify-between items-center bg-[#16171a] px-6 py-2.5 rounded-full shadow-lg border border-[#2c2e33]">
        
//         {/* Home */}
//         <NavLink
//           to="/home"
//           className={({ isActive }) =>
//             `flex items-center justify-center flex-1 transition-colors ${
//               isActive ? "text-white" : "text-[#dcdcdc] hover:text-[#f0eeee]"}`
//           }
//         >
//           {({ isActive }) =>
//             isActive ? <GoHomeFill className="text-2xl" /> : <GoHome className="text-2xl" />
//           }
//         </NavLink>

//         {/* Bookmarks */}
//         <NavLink
//           to="/bookmarks"
//           className={({ isActive }) =>
//             `flex items-center justify-center flex-1 transition-colors ${
//               isActive ? "text-white" : "text-[#dcdcdc] hover:text-[#f0eeee]"}`
//           }
//         >
//           {({ isActive }) =>
//             isActive ? <MdBookmark className="text-2xl" /> : <MdBookmarkBorder className="text-2xl" />
//           }
//         </NavLink>

//         {/* Settings */}
//         <NavLink
//           to="/settings"
//           className={({ isActive }) =>
//             `flex items-center justify-center flex-1 transition-colors ${
//               isActive ? "text-white" : "text-[#dcdcdc] hover:text-[#f0eeee]"}`
//           }
//         >
//           {({ isActive }) =>
//             isActive ? <IoSettingsSharp className="text-2xl" /> : <IoSettingsOutline className="text-2xl" />
//           }
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export default BottomBar;
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function BottomBar() {
  const links = [
  { to: "/homepage/home", icon: GoHome, iconActive: GoHomeFill },
  { to: "/homepage/bookmarks", icon: MdBookmarkBorder, iconActive: MdBookmark },
  { to: "/homepage/settings", icon: IoSettingsOutline, iconActive: IoSettingsSharp },
];


  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[350px] px-6">
      <div className="flex justify-between items-center bg-[#16171a] px-6 py-2.5 rounded-full shadow-lg border border-[#2c2e33]">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center justify-center flex-1 transition-colors ${
                isActive ? "text-white" : "text-[#dcdcdc] hover:text-[#f0eeee]"
              }`
            }
          >
            {({ isActive }) => {
              const Icon = isActive ? link.iconActive : link.icon;
              return <Icon className="text-2xl" />;
            }}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default BottomBar;
