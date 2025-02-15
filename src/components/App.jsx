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
import IngredientDetails from "./burger-ingredients/ingredient-details/ingredient-details.jsx";
import Modal from "./modals/modal/modal.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchIngredientsThunk } from "../services/slices/ingredientsSlice.js";
import { getUserDataThunk } from "../services/slices/userDataSlice.js";
import { useDispatch } from "react-redux";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
      dispatch(fetchIngredientsThunk()); 
    }, [dispatch]);

    useEffect(() => {
      dispatch(getUserDataThunk());
    }, [dispatch]);  

  return (
    <div className="app-container">
      <AppHeader />
      <Routes location={background || location}>
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
          element={<ProtectedRouteElement element={<Register />} onlyUnAuth />}
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
            <ProtectedRouteElement
              element={<ResetPassword />} onlyUnAuth
            />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        />
        {!background && (
          <Route
            path="/ingredients/:ingredientId"
            element={<ProtectedRouteElement element={<IngredientDetails />} />}
          />
        )}
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <ProtectedRouteElement
                element={
                  <Modal onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
