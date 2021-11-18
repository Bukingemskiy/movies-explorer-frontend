import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo.js";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);

  function handleChangeEmail(e) {
    setEmail(e.target.value.toLowerCase());
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
    props.onLogin(email, password);
  }

  React.useEffect(() => {
    emailValid && passwordValid ? setIsValid(true) : setIsValid(false);
  }, [emailValid, passwordValid]);

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__fields">
          <div className="login__field">
            <p className="login__field-name">E-mail</p>
            <input
              className="login__input"
              type="email"
              name="email"
              placeholder="E-mail"
              pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$"
              onChange={handleChangeEmail}
              disabled={props.disabledInput}
              required
            />
            <span
              className={`login__error ${
                !emailValid ? "login__error_visible" : ""
              }`}
            >
              Введите корректный e-mail нижним регистром
            </span>
          </div>
          <div className="login__field">
            <p className="login__field-name">Пароль</p>
            <input
              className="login__input"
              type="password"
              name="password"
              minLength="8"
              placeholder="Пароль"
              onChange={handleChangePassword}
              disabled={props.disabledInput}
              required
            />
            <span
              className={`login__error ${
                !passwordValid || props.errorMessage
                  ? "login__error_visible"
                  : ""
              }`}
            >
              {props.errorMessage
                ? props.errorMessage
                : "Пароль должен быть не короче 8 символов"}
            </span>
          </div>
        </fieldset>
        <button className="login__button" type="submit" disabled={!isValid}>
          {props.isLoading ? "Сохранение..." : "Войти"}
        </button>
      </form>
      <h3 className="login__subtitle">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup">
          Регистрация
        </Link>
      </h3>
    </section>
  );
}
export default Login;
