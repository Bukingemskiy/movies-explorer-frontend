import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo.js";
import ValidationForm from "../ValidationForm/ValidationForm.js";

function Login(props) {
  const { values, handleChange, errors, isValid } = ValidationForm();

  console.log(props.errorMessage);
  console.log(values);
  console.log(errors);
  console.log(isValid);

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }

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
              value={values.email || ""}
              placeholder="E-mail"
              onChange={handleChange}
              required
            />
            <span
              className={`login__error ${
                errors.email ? "login__error_visible" : ""
              }`}
            >
              {errors.email}
            </span>
          </div>
          <div className="login__field">
            <p className="login__field-name">Пароль</p>
            <input
              className="login__input"
              type="password"
              name="password"
              value={values.password || ""}
              minLength="8"
              placeholder="Пароль"
              onChange={handleChange}
              required
            />
            <span
              className={`login__error ${
                props.errorMessage ? "login__error_visible" : ""
              }`}
            >
              {errors.password}
            </span>
          </div>
        </fieldset>
        <button className="login__button" type="submit">
          Войти
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
