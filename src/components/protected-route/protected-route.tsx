import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface ProtectedRouteElementProps {
  element: JSX.Element;
  onlyUnAuth?: boolean;
  requireResetPassword?: boolean;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  element,
  onlyUnAuth = false,
  requireResetPassword = false,
}) => {
  const location = useLocation();

  const { request } = useAppSelector((state) => state.userData);
  const accessToken = localStorage.getItem("accessToken");
  const resetPassword = localStorage.getItem("resetPassword") === "true";
  const resetSuccessful = localStorage.getItem("resetSuccessful") === "true";

  if (request) return null;

  if (requireResetPassword && !resetPassword && !resetSuccessful) {
    return (
      <Navigate to="/forgot-password" replace state={{ from: location }} />
    );
  }

  if (!accessToken && !onlyUnAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (accessToken && onlyUnAuth) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  return element;
};
