import styles from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  registerUserThunk,
} from "../../services/slices/userDataSlice";
import { useState } from "react";

function Register() {
  const dispatch = useDispatch();
  const { name, email, error } = useSelector((state) => state.userData);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleNameChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    dispatch(registerUserThunk(userData));
  };

  return (
    <div className={styles.container}>
      <p className={styles.header}>Регистрация</p>
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          onChange={handleNameChange}
          value={name}
          extraClass="mb-6"
        />
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
