// src/pages/Error.jsx
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-[#16171a] text-white px-6">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <h2 className="text-7xl font-extrabold text-amber-500">404</h2>
        <h4 className="mt-4 text-2xl font-semibold">Sorry! Page not found</h4>
        <p className="mt-2 text-gray-400">
          Oops! It seems like the page you're trying to access doesn't exist.
          If you believe there's an issue, feel free to report it.
        </p>

        {/* Back Button */}
        <div className="mt-6">
          <NavLink
            to="/"
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition"
          >
            ⬅ Return Home
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Error;
