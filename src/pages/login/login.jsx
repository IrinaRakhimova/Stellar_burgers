import styles from "./login.module.css";
import { useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, logInThunk } from '../../services/slices/userDataSlice'; 
import Cookies from "js-cookie";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, accessToken, error } = useSelector(state => state.userData);

  const onEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const onPasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleLogIn = () => {
    dispatch(logInThunk({ email, password }));  
  };

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Вход</p>
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={password}
        name={"password"}
        extraClass="mb-6"
      />
      <div className={styles.button}>
        <Button htmlType="button" type="primary" size="large" onClick={handleLogIn}>
          Войти
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className={styles.text}>
        Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default Login;
