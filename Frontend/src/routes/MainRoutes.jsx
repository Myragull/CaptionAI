import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../layouts/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Bookmarks from "../pages/Bookmarks";
import Settings from "../pages/Settings";
import ProtectedRoute from "../components/ProtectedRoute"

function Mainroutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* HomePage layout */}
      {/* <Route path="/homepage" element={<HomePage />}> */}
        {/* <Route index element={<Home />} />           default page */}
          {/* <Route index element={<Navigate to="home" replace />} /> */}
          {/* redirect to /homepage/home */}
        {/* <Route path="home" element={<Home />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="settings" element={<Settings />} />
      </Route> */}

      <Route path="/homepage" element={
  <ProtectedRoute>
    <HomePage />
  </ProtectedRoute>
}>
  <Route index element={<Navigate to="home" replace />} />
  <Route path="home" element={<Home />} />
  <Route path="bookmarks" element={<Bookmarks />} />
  <Route path="settings" element={<Settings />} />
</Route>


      {/* Redirect any unknown routes */}
      <Route path="*" element={<Navigate to="/homepage" />} />
    </Routes>
  );
}

export default Mainroutes;
