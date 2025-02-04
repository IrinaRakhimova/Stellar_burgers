import styles from "./login.module.css";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function Login() {
  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <p className={styles.header}>Вход</p>
      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={passwordValue}
        name={"password"}
        extraClass="mb-6"
      />
      <div className={styles.button}>
        <Button htmlType="button" type="primary" size="large">
          Войти
        </Button>
      </div>
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
