import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, setName } from '../../services/slices/userDataSlice'; 
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getUserData } from "../../services/slices/userDataSlice";

function Profile() {
  const location = useLocation(); 
  const currentPath = location.pathname;

  const dispatch = useDispatch();
  const { email, password, name } = useSelector(state => state.userData);

  useEffect(() => {
      dispatch(getUserData(`authorization: ${Cookies.get("accessToken")}`))
    }, []);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.navItemContainer}>
          <Link
            to="/profile"
            className={`${styles.navItem} ${
              currentPath === "/profile" ? styles.active : ""
            }`}
          >
            Профиль
          </Link>
        </div>
        <div className={styles.navItemContainer}>
          <Link
            to="/profile/orders"
            className={`${styles.navItem} ${
              currentPath === "/profile/orders" ? styles.active : ""
            }`}
          >
            История заказов
          </Link>
        </div>
        <div className={styles.navItemContainer}>
          <Link className={styles.navItem}>Выход</Link>
        </div>
        <p className={styles.text}>
          В этом разделе вы можете <br />
          изменить свои персональные данные
        </p>
      </div>
      <div className={styles.form}>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          onChange={setName}
          value={name}
          extraClass="mb-6"
          icon="EditIcon"
        />
        <EmailInput
          onChange={setEmail}
          value={email}
          name={"email"}
          placeholder="Логин"
          isIcon={false}
          extraClass="mb-6"
          icon="EditIcon"
        />
        <PasswordInput
          onChange={setPassword}
          value={password}
          name={"password"}
          extraClass="mb-6"
          placeholder="Пароль"
          icon="EditIcon"
        />
      </div>
    </div>
  );
}

export default Profile;
