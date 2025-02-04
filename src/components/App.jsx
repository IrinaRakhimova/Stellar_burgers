import "./App.css";
import { AppHeader } from "./app-header/app-header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main/main.jsx";
import Login from "../pages/login/login.jsx";
import Register from "../pages/register/register.jsx";
import ForgotPassword from "../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../pages/reset-password/reset-password.jsx";
import Profile from "../pages/profile/profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
