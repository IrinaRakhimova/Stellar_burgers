import { useState, useEffect } from "react";
import styles from "./profile-form.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  updateUserDataThunk,
} from "../../../services/slices/userDataSlice";

function ProfileForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, name, successLogout } = useSelector((state) => state.userData);

  const [password, setPassword] = useState("");

  const [initialName, setInitialName] = useState(name);
  const [initialEmail, setInitialEmail] = useState(email);
  const [initialPassword, setInitialPassword] = useState("");

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (
      name !== initialName ||
      email !== initialEmail ||
      password !== initialPassword
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [name, email, password, initialName, initialEmail, initialPassword]);

  const handleNameChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasChanges) {
      dispatch(updateUserDataThunk({ name, email, password }));
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    dispatch(setName(initialName));
    dispatch(setEmail(initialEmail));
    setPassword(initialPassword);
  };

  useEffect(() => {
    if (successLogout) {
      navigate("/login");
    }
  }, [successLogout, navigate]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        name={"name"}
        placeholder={"Имя"}
        onChange={handleNameChange}
        value={name}
        extraClass="mb-6"
        icon="EditIcon"
      />
      <EmailInput
        onChange={handleEmailChange}
        value={email}
        name={"email"}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-6"
        icon="EditIcon"
      />
      <PasswordInput
        onChange={handlePasswordChange}
        value={password}
        name={"password"}
        extraClass="mb-6"
        placeholder="Пароль"
        icon="EditIcon"
      />
      {hasChanges && (
        <div className={styles.buttonsContainer}>
          <button
            className={styles.button}
            onClick={handleCancel}
            type="button"
          >
            Отменить
          </button>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileForm;
