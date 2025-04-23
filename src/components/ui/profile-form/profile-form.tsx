import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./profile-form.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import {
  setEmail,
  setName,
  updateUserDataThunk,
} from "../../../slices/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useMediaQuery } from "../../../hooks/useIsMobile";

interface ProfileFormProps {}

const ProfileForm: React.FC<ProfileFormProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mobile = useMediaQuery(640);
  const { email, name, successLogout } = useAppSelector(
    (state) => state.userData
  );

  const [password, setPassword] = useState<string>("");
  const [initialName, setInitialName] = useState<string>(name);
  const [initialEmail, setInitialEmail] = useState<string>(email);
  const [initialPassword, setInitialPassword] = useState<string>("");
  const [hasChanges, setHasChanges] = useState<boolean>(false);

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setName(e.target.value));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (hasChanges) {
      dispatch(updateUserDataThunk({ name, email, password }));
      setHasChanges(false);
    }
  };

  const handleCancel: () => void = () => {
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
        placeholder={"Name"}
        onChange={handleNameChange}
        value={name}
        extraClass="mb-6"
        icon="EditIcon"
        size={mobile ? "small" : "default"}
      />
      <EmailInput
        onChange={handleEmailChange}
        value={email}
        name={"email"}
        placeholder="Email"
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
        icon="EditIcon"
        size={mobile ? "small" : "default"}
      />
      {hasChanges && (
        <div className={styles.buttonsContainer}>
          <button
            className={styles.button}
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <Button htmlType="submit" type="primary" size="large">
            Save
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
