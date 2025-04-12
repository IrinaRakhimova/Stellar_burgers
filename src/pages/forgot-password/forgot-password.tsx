import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  setEmail,
  setResetPassword,
  setError,
  setRequest,
} from "../../slices/userDataSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { handleForgotPassword } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const ForgotPassword: React.FC = () => {
  const { email, error, resetPassword } = useAppSelector(
    (state: { userData: UserDataState }) => state.userData
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setRequest(true));

    try {
      await handleForgotPassword(email);
      dispatch(setResetPassword(true));
      dispatch(setRequest(false));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(setError(err.message || "Ошибка восстановления пароля"));
      } else {
        dispatch(setError("Ошибка восстановления пароля"));
      }
      dispatch(setRequest(false));
    }
  };

  useEffect(() => {
    if (resetPassword) {
      localStorage.setItem("resetPassword", "true");
      navigate("/reset-password");
      dispatch(setResetPassword(false));
    }
  }, [resetPassword, navigate, dispatch]);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Восстановление пароля</p>
      <form onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};
