import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./profile-menu.module.css";
import { logOutThunk } from "../../../slices/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const ProfileMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPath = location.pathname;

  const { successLogout } = useAppSelector((state) => state.userData);

  const handleLogout = () => {
    dispatch(logOutThunk({ token: localStorage.getItem("refreshToken") }))
      .unwrap()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error("Logout failed:", error.message);
        } else {
          console.error("Logout failed:", error);
        }
        navigate("/login");
      });
  };

  useEffect(() => {
    if (successLogout) {
      navigate("/login");
    }
  }, [successLogout, navigate]);

  return (
    <div className={styles.nav}>
      <div className={styles.navItemContainer}>
        <Link
          to="/profile"
          className={`${styles.navItem} ${
            currentPath === "/profile" ? styles.active : ""
          }`}
        >
          Profile
        </Link>
      </div>
      <div className={styles.navItemContainer}>
        <Link
          to="/profile/orders"
          className={`${styles.navItem} ${
            currentPath === "/profile/orders" ? styles.active : ""
          }`}
        >
          Order History
        </Link>
      </div>
      <div className={styles.navItemContainer}>
        <button className={styles.navItem} onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <p className={styles.text}>
        In this section, you can change<br />
         your personal information.
      </p>
    </div>
  );
};

export default ProfileMenu;
