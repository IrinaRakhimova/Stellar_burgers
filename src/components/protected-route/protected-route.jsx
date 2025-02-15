import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRouteElement = ({ element, onlyUnAuth = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userDataRequest } = useSelector((state) => state.userData);
  const forgotPassword = localStorage.getItem("resetPassword") === "true";

  const accessToken = localStorage.getItem("accessToken");

  if (userDataRequest) return null; 

  if (!accessToken && !onlyUnAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (accessToken && onlyUnAuth) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  return element;
};

export default ProtectedRouteElement;