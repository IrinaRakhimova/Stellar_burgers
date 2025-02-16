import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ element, onlyUnAuth = false, requireResetPassword = false }) => {
  const location = useLocation();

  const { userDataRequest } = useSelector((state) => state.userData);


  const accessToken = localStorage.getItem("accessToken");
  const resetPassword = localStorage.getItem("resetPassword") === "true";
  const resetSuccessful = localStorage.getItem("resetSuccessful") === "true";

  if (userDataRequest) return null; 

  if (requireResetPassword && !resetPassword && !resetSuccessful) { 
    return <Navigate to="/forgot-password" replace state={{ from: location }} />;
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