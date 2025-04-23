import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "../../hooks/useIsMobile";

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const mobile = useMediaQuery(740);
  const currentPath: string = location.pathname;

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={styles.leftSideList}>
            <div>
              <Link
                to="/"
                className={`${styles.link} ${styles.listItem} ${
                  currentPath === "/" ? styles.active : ""
                }`}
              >
                <BurgerIcon
                  type={currentPath === "/" ? "primary" : "secondary"}
                />
                {!mobile && "Constructor"}
              </Link>
            </div>
            <div>
              <Link
                to="/feed"
                className={`${styles.link} ${styles.listItem} ${
                  currentPath.startsWith("/feed") ? styles.active : ""
                }`}
              >
                <ListIcon
                  type={
                    currentPath.startsWith("/feed") ? "primary" : "secondary"
                  }
                />
                {!mobile && "Order Feed"}
              </Link>
            </div>
          </li>
          <li className={styles.logo}>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`${styles.link} ${styles.listItem} ${
                currentPath.startsWith("/profile") ? styles.active : ""
              }`}
            >
              <ProfileIcon
                type={
                  currentPath.startsWith("/profile") ? "primary" : "secondary"
                }
              />
              {!mobile && "My Account"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
