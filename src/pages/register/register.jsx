import styles from "./register.module.css";
import { EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, registerUserThunk } from '../../services/slices/userDataSlice'; 

function Register() {
  const dispatch = useDispatch();

  const { name, email, password,  error } = useSelector(state => state.userData);

  const onNameChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const onEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const onPasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleRegister = () => {
    const userData = { name, email, password };
    dispatch(registerUserThunk(userData));
  };

  return (
    <div className={styles.container}>
      <p className={styles.header}>Регистрация</p>
      <Input 
        type={'text'}
        name={'name'}
        placeholder={'Имя'}
        onChange={onNameChange}
        value={name}
        extraClass="mb-6"
      /> 
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={password}
        name={"password"}
        extraClass="mb-6"
      />
      <div className={styles.button}>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleRegister} 
        >
          Зарегистрироваться
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default Register;