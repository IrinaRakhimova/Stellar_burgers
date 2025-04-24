import React, { useState } from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  MenuIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "../../hooks/useIsMobile";
import MobileLogo from "../../assets/mobile-logo";

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const mobile = useMediaQuery(1200);
  const currentPath: string = location.pathname;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {mobile ? (
            <>
              <div className={styles.mobileMenu}>
                <li>
                  <MobileLogo />
                </li>
                <li onClick={toggleMobileMenu} style={{ cursor: "pointer" }}>
                  <MenuIcon type="primary" />
                </li>
              </div>

              {isMobileMenuOpen && (
                <ul className={styles.mobileNavList}>
                  <li className={styles.listItem}>
                    <Link
                      to="/"
                      className={`${styles.link} ${
                        currentPath === "/" ? styles.active : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BurgerIcon
                        type={currentPath === "/" ? "primary" : "secondary"}
                      />
                      Constructor
                    </Link>
                  </li>
                  <li className={styles.listItem}>
                    <Link
                      to="/feed"
                      className={`${styles.link} ${
                        currentPath.startsWith("/feed") ? styles.active : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ListIcon
                        type={
                          currentPath.startsWith("/feed")
                            ? "primary"
                            : "secondary"
                        }
                      />
                      Order Feed
                    </Link>
                  </li>
                  <li className={styles.listItem}>
                    <Link
                      to="/profile"
                      className={`${styles.link} ${
                        currentPath.startsWith("/profile") ? styles.active : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ProfileIcon
                        type={
                          currentPath.startsWith("/profile")
                            ? "primary"
                            : "secondary"
                        }
                      />
                      My Account
                    </Link>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <li className={`${styles.leftSideList} ${styles.listItem}`}>
                <div>
                  <Link
                    to="/"
                    className={`${styles.link}  ${
                      currentPath === "/" ? styles.active : ""
                    }`}
                  >
                    <BurgerIcon
                      type={currentPath === "/" ? "primary" : "secondary"}
                    />
                    Constructor
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
                        currentPath.startsWith("/feed")
                          ? "primary"
                          : "secondary"
                      }
                    />
                    Order Feed
                  </Link>
                </div>
              </li>
              <li className={styles.logo}>
                <Link to="/">
                  <Logo />
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link
                  to="/profile"
                  className={`${styles.link} ${
                    currentPath.startsWith("/profile") ? styles.active : ""
                  }`}
                >
                  <ProfileIcon
                    type={
                      currentPath.startsWith("/profile")
                        ? "primary"
                        : "secondary"
                    }
                  />
                  My Account
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
