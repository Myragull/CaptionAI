import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { Suspense, lazy } from "react";
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../layouts/HomePage"));
const Home = lazy(() => import("../pages/Home"));
const Settings = lazy(() => import("../pages/Settings"));
const Bookmarks = lazy(() => import("../pages/Bookmarks"));
const Error = lazy(()=>import("../pages/Error"))

function Mainroutes() {
  return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen text-white text-xl font-semibold">Loading...</div>}>
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/homepage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Redirect any unknown routes */}
      <Route path="*" element={<Error /> } />
    </Routes>
    </Suspense>
  );
}

export default Mainroutes;
