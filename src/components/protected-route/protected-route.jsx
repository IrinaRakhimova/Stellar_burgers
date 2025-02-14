import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const ProtectedRouteElement = ({ element, onlyUnAuth = false, requiresForgotPassword = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userDataRequest } = useSelector((state) => state.userData);
  const forgotPasswordVisited = localStorage.getItem("forgotPasswordVisited") === "true";

  const accessToken = Cookies.get("accessToken");

  if (userDataRequest) return null; 

  if (requiresForgotPassword && !forgotPasswordVisited) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (!accessToken && !onlyUnAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (accessToken && onlyUnAuth) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  return element;
};

export default ProtectedRouteElement;