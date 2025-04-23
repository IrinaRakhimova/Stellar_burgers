import styles from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  setName,
  setEmail,
  registerUserThunk,
} from "../../slices/userDataSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMediaQuery } from "../../hooks/useIsMobile";

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const mobile = useMediaQuery(640);
  const { name, email, error } = useAppSelector(
    (state: { userData: UserDataState }) => state.userData
  );
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, email, password };
    dispatch(registerUserThunk(userData));
  };

  return (
    <div className={styles.container}>
      <p className={styles.header}>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Name"}
          onChange={handleNameChange}
          value={name}
          extraClass="mb-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          size={mobile ? "small" : "default"}
        />
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
          size={mobile ? "small" : "default"}
        />
        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name={"password"}
          extraClass="mb-6"
          placeholder="Password"
          size={mobile ? "small" : "default"}
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Sign Up
          </Button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Already registered?{" "}
        <Link to="/login" className={styles.link}>
          Sign In
        </Link>
      </p>
    </div>
  );
};
