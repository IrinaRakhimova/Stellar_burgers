import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { setToken, resetSuccess, resetPasswordThunk } from "../../services/slices/userDataSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ResetPassword() {
  const { success, error, token } = useSelector(state => state.userData);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => setPassword(e.target.value);


    const onTokenChange = (e) => {
      dispatch(setToken(e.target.value));
    };

  const handleReset = () => {
      dispatch(resetPasswordThunk({ password, token }));
    };

    useEffect(() => {
      if (success) {  
        localStorage.removeItem("resetPassword");
        localStorage.setItem("resetSuccessful", "true");  
        dispatch(resetSuccess()); 
        navigate("/login");           
      }
    }, [success, navigate, dispatch]);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Восстановление пароля</p>
      <PasswordInput
        onChange={handlePasswordChange}
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
