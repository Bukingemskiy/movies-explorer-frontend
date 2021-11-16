import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo.js";

function Register(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);

  function handleChangeName(e) {
    setName(e.target.value);
    if (props.errorMessage.length > 0) {
      props.setErrorMessage("");
    }
    setNameValid(e.target.checkValidity());
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (props.errorMessage.length > 0) {
      props.setErrorMessage("");
    }
    setEmailValid(e.target.checkValidity());
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (props.errorMessage.length > 0) {
      props.setErrorMessage("");
    }
    setPasswordValid(e.target.checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(name, email, password);
    props.onLogin(email, password);
  }

  React.useEffect(() => {
    nameValid && emailValid && passwordValid
      ? setIsValid(true)
      : setIsValid(false);
  }, [emailValid, nameValid, passwordValid]);

  return (
    <section className="register" onSubmit={handleSubmit}>
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <fieldset className="register__fields">
          <div className="register__field">
            <p className="register__field-name">Имя</p>
            <input
              className="register__input"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              onChange={handleChangeName}
              required
            />
            <span
              className={`register__error ${
                !nameValid ? "register__error_visible" : ""
              }`}
            >
              Это поле должно содержать от 2 до 30 символов
            </span>
          </div>
          <div className="register__field">
            <p className="register__field-name">E-mail</p>
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$"
              onChange={handleChangeEmail}
              required
            />
            <span
              className={`register__error ${
                !emailValid ? "register__error_visible" : ""
              }`}
            >
              Введите корректный e-mail
            </span>
          </div>
          <div className="register__field">
            <p className="register__field-name">Пароль</p>
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="8"
              onChange={handleChangePassword}
              required
            />
            <span
              className={`register__error ${
                !passwordValid || props.errorMessage
                  ? "register__error_visible"
                  : ""
              }`}
            >
              {props.errorMessage
                ? props.errorMessage
                : "Пароль должен быть не короче 8 символов"}
            </span>
          </div>
        </fieldset>
        <button className="register__button" type="submit" disabled={!isValid}>
          {props.isLoading ? "Сохранение..." : "Зарегистрироваться"}
        </button>
      </form>
      <h3 className="register__subtitle">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin">
          Войти
        </Link>
      </h3>
    </section>
  );
}
export default Register;
