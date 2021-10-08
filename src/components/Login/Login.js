import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo.js";

function Login() {
  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <fieldset className="login__fields">
          <div className="login__field">
            <p className="login__field-name">E-mail</p>
            <input
              className="login__input"
              type="email"
              name="email"
              placeholder="pochta@yandex.ru"
              required
            />
            <span className="login__error"></span>
          </div>
          <div className="login__field">
            <p className="login__field-name">Пароль</p>
            <input
              className="login__input"
              type="password"
              name="password"
              minLength="8"
              required
            />
            <span className="login__error"></span>
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
