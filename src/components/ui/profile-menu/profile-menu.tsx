import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./profile-menu.module.css";
import { logOutThunk } from "../../../slices/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useMediaQuery } from "../../../hooks/useIsMobile";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const ProfileMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPath = location.pathname;
  const isMobile = useMediaQuery(1230);

  const { successLogout } = useAppSelector((state) => state.userData);

  const [currentTab, setCurrentTab] = useState<"profile" | "orders">(
    currentPath === "/profile/orders" ? "orders" : "profile"
  );

  const handleLogout = () => {
    dispatch(logOutThunk({ token: localStorage.getItem("refreshToken") }))
      .unwrap()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      })
      .catch((error: unknown) => {
        console.error("Logout failed:", error);
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
      {isMobile ? (
        <>
          <div className={styles.tabs}>
            <Tab value="profile" active={location.pathname === "/profile"} onClick={() => {
              setCurrentTab("profile");
              navigate("/profile");
            }}>
              Profile
            </Tab>
            <Tab value="orders"  active={location.pathname.startsWith("/profile/orders")} onClick={() => {
              setCurrentTab("orders");
              navigate("/profile/orders");
            }}>
              Order History
            </Tab>
          </div>
          {currentTab === "profile" && (
            <div className={styles.mobileLogoutWrapper}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.navItemContainer}>
            <Link
              to="/profile"
              className={`${styles.navItem} ${currentPath === "/profile" ? styles.active : ""}`}
            >
              Profile
            </Link>
          </div>
          <div className={styles.navItemContainer}>
            <Link
              to="/profile/orders"
              className={`${styles.navItem} ${currentPath === "/profile/orders" ? styles.active : ""}`}
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
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
