import "./App.css";
import { AppHeader } from "./app-header/app-header";
import { Routes, Route } from "react-router-dom";
import { ProtectedRouteElement } from "./protected-route/protected-route";
import { Main } from "../pages/main/main";
import { Login } from "../pages/login/login";
import { Register } from "../pages/register/register";
import { ForgotPassword } from "../pages/forgot-password/forgot-password";
import ResetPassword from "../pages/reset-password/reset-password";
import { Profile } from "../pages/profile/profile";
import IngredientDetails from "./burger-ingredients/ingredient-details/ingredient-details";
import Modal from "./modals/modal/modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchIngredientsThunk } from "../slices/ingredientsSlice";
import { getUserDataThunk } from "../slices/userDataSlice";
import { useAppDispatch } from "../store/hooks";
import { OrderHistory } from "./ui/order-history/order-history";
import ProfileForm from "./ui/profile-form/profile-form";
import { NotFound } from "../pages/not-found/not-found";
import { Feed } from "../pages/feed/feed";
import { OrderInfo } from "./ui/order-info/order-info";

type LocationState = {
  background?: Location;
};

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const background = (location.state as LocationState)?.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getUserDataThunk(token));
    }
  }, [dispatch]);

  return (
    <div className="app-container">
      <AppHeader />
      <Routes location={background || location}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Main />} />
        <Route path="/feed" element={<Feed />} />
        {!background && <Route path="/feed/:number" element={<OrderInfo />} />}
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
              element={<ResetPassword />}
              requireResetPassword
              onlyUnAuth
            />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        >
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<OrderHistory />} />
        </Route>
        {!background && (
          <Route
            path="profile/orders/:number"
            element={<ProtectedRouteElement element={<OrderInfo />} />}
          />
        )}
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
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:number"
            element={
              <ProtectedRouteElement
                element={
                  <Modal onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
