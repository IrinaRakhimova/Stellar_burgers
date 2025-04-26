import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  setToken,
  setResetPassword,
  setError,
  setRequest,
  setSuccess,
} from "../../slices/userDataSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetPassword } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMediaQuery } from "../../hooks/useIsMobile";

const ResetPassword: React.FC = () => {
  const { token, success } = useAppSelector(
    (state: { userData: UserDataState }) => state.userData
  );
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mobile = useMediaQuery(640);

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
      dispatch(setSuccess());
      dispatch(setRequest(false));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(setError(err.message || "Password reset error"));
      } else {
        dispatch(setError("Password reset error"));
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
      <p className={styles.header}>Password Reset</p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name={"password"}
          extraClass="mb-6"
          placeholder="Enter new password"
          size={mobile ? "small" : "default"}
        />
        <Input
          type={"text"}
          name={"code"}
          placeholder={"Enter the code from the email"}
          onChange={handleTokenChange}
          value={token}
          extraClass="mb-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          size={mobile ? "small" : "default"}
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Save
          </Button>
        </div>
      </form>
      <p className={styles.text}>
        Remembered your password?{" "}
        <Link to="/login" className={styles.link}>
          Log In
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
