import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo.js";

function Register(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(name, email, password);
    props.onLogin(email, password);
  }
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
              onChange={handleChangeName}
              required
            />
            <span className="register__error"></span>
          </div>
          <div className="register__field">
            <p className="register__field-name">E-mail</p>
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChangeEmail}
              required
            />
            <span className="register__error"></span>
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
            <span className="register__error"></span>
          </div>
        </fieldset>
        <button className="register__button" type="submit">
          Зарегистрироваться
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
