import styles from "./forgot-password.module.css";
import { useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <p className={styles.header}>Восстановление пароля</p>
      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <div className={styles.button}>
        <Button htmlType="button" type="primary" size="large">
          Восстановить
        </Button>
      </div>
      <p className={styles.text}>
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
