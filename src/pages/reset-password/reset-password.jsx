import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setToken, resetSuccess, resetPasswordThunk } from "../../services/slices/userDataSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ResetPassword() {
  const { success, password, error, token } = useSelector(state => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onPasswordChange = (e) => {
      dispatch(setPassword(e.target.value));
    };

    const onTokenChange = (e) => {
      dispatch(setToken(e.target.value));
    };

  const handleReset = () => {
      dispatch(resetPasswordThunk({ password, token }));
    };

    useEffect(() => {
      if (success) {
        navigate("/"); 
        dispatch(resetSuccess());
      }
    }, [success, navigate, dispatch]);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Восстановление пароля</p>
      <PasswordInput
        onChange={onPasswordChange}
        value={password}
        name={"password"}
        extraClass="mb-6"
        placeholder="Введите новый пароль"
      />
      <Input
        type={"text"}
        name={"code"}
        placeholder={"Введите код из письма"}
        onChange={onTokenChange}
        value={token}
        extraClass="mb-6"
      />
      <div className={styles.button}>
        <Button htmlType="button" type="primary" size="large" onClick={handleReset}>
          Сохранить
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
