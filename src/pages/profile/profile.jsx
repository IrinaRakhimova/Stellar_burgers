import styles from "./profile.module.css";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";


function Profile() {
    const [nameValue, setNameValue] = useState("");
    const onNameChange = (e) => {
      setNameValue(e.target.value);
    };
  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  return (
    <div className={styles.container}>
        <div className={styles.nav}>
            <p className={styles.navItem}>Профиль</p>
            <p className={styles.navItem}>История заказов</p>
            <p className={styles.navItem}>Выход</p>
            <p className={styles.text}>В этом разделе вы можете <br />изменить свои персональные данные</p>
        </div>
      <div className={styles.form}> 
        <Input 
                type={'text'}
                name={'name'}
                placeholder={'Имя'}
                onChange={onNameChange}
                value={nameValue}
                extraClass="mb-6"
                icon="EditIcon"
              /> 
      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={"email"}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-6"
        icon="EditIcon"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={passwordValue}
        name={"password"}
        extraClass="mb-6"
        placeholder="Пароль"
        icon="EditIcon"
      />
      </div> 
      
    </div>
  );
}

export default Profile;