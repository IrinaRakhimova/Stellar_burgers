import styles from "./login.module.css";
import { useEffect, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { setEmail, logInThunk } from "../../slices/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMediaQuery } from "../../hooks/useIsMobile";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mobile = useMediaQuery(640);

  const { email, error } = useAppSelector(
    (state: { userData: UserDataState }) => state.userData
  ); 

  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logInThunk({ email, password }));
    setPassword("");
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const resetSuccessful = localStorage.getItem("resetSuccessful") === "true";
    if (resetSuccessful) {
      localStorage.removeItem("resetSuccessful");
    }
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Login</p>
      <form onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name="email"
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
          size={mobile ? "small" : "default"}
        />
        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name="password"
          extraClass="mb-6"
          placeholder="Password"
          size={mobile ? "small" : "default"}
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Sign In
          </Button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        New here?{" "}
        <Link to="/register" className={styles.link}>
          Sign Up
        </Link>
      </p>
      <p className={styles.text}>
        Forgot your password?{" "}
        <Link to="/forgot-password" className={styles.link}>
          Reset
        </Link>
      </p>
    </div>
  );
};
