import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, resetSuccess, forgotPasswordThunk, setResetPassword, } from "../../services/slices/userDataSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ForgotPassword() {
  const { email, error,  resetPassword } = useSelector(state => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEmailChange = (e) => {
      dispatch(setEmail(e.target.value));
    };

    const handleReset = () => {
      dispatch(forgotPasswordThunk({ email }));
    };
    
    useEffect(() => {
      if (resetPassword) {
        navigate("/reset-password");
        dispatch(setResetPassword(false));
      }
    }, [resetPassword, navigate, dispatch]);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Восстановление пароля</p>
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <div className={styles.button}>
        <Button htmlType="button" type="primary" size="large" onClick={handleReset}>
          Восстановить
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
