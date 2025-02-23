import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setResetPassword,
  setError,
  setRequest,
  setSuccess,
} from "../../services/slices/userDataSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetPassword } from "../../utils/api";
import { AppDispatch } from "../../services/store";

interface UserDataState {
  token: string;
  success: boolean;
}

const ResetPassword: React.FC = () => {
  const { token, success } = useSelector(
    (state: { userData: UserDataState }) => state.userData
  );
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setToken(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setRequest(true));

    try {
      await resetPassword({ password, token });
      dispatch(setSuccess(true));
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
    console.log("Success flag:", success);
    if (success) {
      localStorage.removeItem("resetPassword");
      localStorage.setItem("resetSuccessful", "true");
      dispatch(setResetPassword(false));
      navigate("/login");
    }
  }, [success, navigate, dispatch]);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Восстановление пароля</p>
      <form onSubmit={handleSubmit}>
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
          onChange={handleTokenChange}
          value={token}
          extraClass="mb-6" 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}        
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>
      <p className={styles.text}>
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;