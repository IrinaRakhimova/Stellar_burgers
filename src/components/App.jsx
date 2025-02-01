import "./App.css";
import { AppHeader } from "./app-header/app-header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main/main.jsx";
import Login from "../pages/login/login.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
