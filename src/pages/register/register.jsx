import styles from "./register.module.css";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function Register() {
    const [nameValue, setNameValue] = useState("");
    const onNameChange = (e) => {
      setNameValue(e.target.value);
    };

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
      <p className={styles.header}>Регистрация</p>
      <Input 
        type={'text'}
        name={'name'}
        placeholder={'Имя'}
        onChange={onNameChange}
        value={nameValue}
        extraClass="mb-6"
      /> 
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
        Зарегистрироваться
        </Button>
      </div>
      <p className={styles.text}>
      Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default Register;
