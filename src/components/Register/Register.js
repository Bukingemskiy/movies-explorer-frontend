import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo.js";

function Register() {
  return (
    <section className="register">
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
              placeholder="Виталий"
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
              placeholder="pochta@yandex.ru"
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
              placeholder="••••••••••••••"
              minLength="8"
              required
            />
            <span className="register__error">Что-то пошло не так...</span>
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
