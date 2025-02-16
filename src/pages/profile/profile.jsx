import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  logOutThunk,
  updateUserDataThunk,
} from "../../services/slices/userDataSlice";

function Profile() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, name, successLogout } = useSelector(
    (state) => state.userData
  );

  const [password, setPassword] = useState('');

  const [initialName, setInitialName] = useState(name);
  const [initialEmail, setInitialEmail] = useState(email);
  const [initialPassword, setInitialPassword] = useState("");

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (
      name !== initialName ||
      email !== initialEmail ||
      password !== initialPassword

    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [name, email, password, initialName, initialEmail]);

  const onNameChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const onEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const onPasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logOutThunk({ token: localStorage.getItem("refreshToken") }))
      .unwrap()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/login");
      });
  };

  const handleDataUpdate = () => {
    dispatch(updateUserDataThunk({ name, email, password }));
  };

  const handleCancel = () => {
    dispatch(setName(initialName));
    dispatch(setEmail(initialEmail));
    dispatch(setPassword(password));
  };

  useEffect(() => {
    if (successLogout) {
      navigate("/login");
    }
  }, [successLogout, navigate]);

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
          <button className={styles.navItem} onClick={handleLogout}>
            Выход
          </button>
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
          onChange={onNameChange}
          value={name}
          extraClass="mb-6"
          icon="EditIcon"
        />
        <EmailInput
          onChange={onEmailChange}
          value={email}
          name={"email"}
          placeholder="Логин"
          isIcon={false}
          extraClass="mb-6"
          icon="EditIcon"
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name={"password"}
          extraClass="mb-6"
          placeholder="Пароль"
          icon="EditIcon"
        />
        {hasChanges && (
          <div className={styles.buttonsContainer}>
            <button className={styles.button} onClick={handleCancel}>
              Отменить
            </button>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handleDataUpdate}
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;