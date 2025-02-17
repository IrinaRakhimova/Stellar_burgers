import styles from "./login.module.css";
import { useEffect, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, logInThunk } from "../../services/slices/userDataSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, accessToken, error } = useSelector((state) => state.userData);

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(logInThunk({ email, password }));
    setPassword("");
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const resetSuccessful = localStorage.getItem("resetSuccessful") === "true";
    if (resetSuccessful) {
      localStorage.removeItem("resetSuccessful");
    }
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Вход</p>
      <form onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Вы — новый пользователь?{" "}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={styles.text}>
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default Login;
