import "./App.css";
import { AppHeader } from "./app-header/app-header.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRouteElement from "./protected-route/protected-route.jsx";
import Main from "../pages/main/main.jsx";
import Login from "../pages/login/login.jsx";
import Register from "../pages/register/register.jsx";
import ForgotPassword from "../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../pages/reset-password/reset-password.jsx";
import Profile from "../pages/profile/profile.jsx";

function App() {
  return (
      <div className="app-container">
        <AppHeader />
        <Routes>
          <Route 
            path="/" 
            element={<ProtectedRouteElement element={<Main />} />} 
          />

          <Route
            path="/login"
            element={<ProtectedRouteElement element={<Login />} onlyUnAuth />}
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement element={<Register />} onlyUnAuth />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement element={<ForgotPassword />} onlyUnAuth />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement element={<ResetPassword />} requiresForgotPassword={true} />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Profile />} />}
          />
        </Routes>
      </div>
  );
}

export default App;
