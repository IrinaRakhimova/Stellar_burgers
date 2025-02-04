import styles from "./reset-password.module.css";
import { useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const [codeValue, setCodeValue] = useState("");
  const onCodeChange = (e) => {
    setPasswordValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <p className={styles.header}>Восстановление пароля</p>
      <PasswordInput
        onChange={onPasswordChange}
        value={passwordValue}
        name={"password"}
        extraClass="mb-6"
        placeholder="Введите новый пароль"
      />
      <Input
        type={"text"}
        name={"code"}
        placeholder={"Введите код из письма"}
        onChange={onCodeChange}
        value={codeValue}
        extraClass="mb-6"
      />
      <div className={styles.button}>
        <Button htmlType="button" type="primary" size="large">
          Сохранить
        </Button>
      </div>
      <p className={styles.text}>
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
