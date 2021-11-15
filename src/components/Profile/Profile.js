import React from "react";
import "./Profile.css";
import Header from "../Header/Header.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);

  console.log(props.errorMessage);
  console.log(nameValid);
  console.log(emailValid);
  console.log(isValid);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
    setNameValid(e.target.checkValidity());
    console.log(nameValid);
    console.log(isValid);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setEmailValid(e.target.checkValidity());
    console.log(emailValid);
    console.log(isValid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      email: email,
    });
  }

  React.useEffect(() => {
    nameValid && emailValid ? setIsValid(true) : setIsValid(false);
    console.log(nameValid);
    console.log(emailValid);
    console.log(isValid);
  }, [name, email, nameValid, emailValid, isValid]);

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, {name}!</h2>
        <form onSubmit={handleSubmit} className="profile__form">
          <fieldset className="profile__fields">
            <div className="profile__field">
              <p className="profile__field-name">Имя</p>
              <input
                className="profile__input"
                type="text"
                name="name"
                value={name || ""}
                minLength="2"
                maxLength="30"
                onChange={handleChangeName}
              />
            </div>
            <span
              className={`profile__error ${
                !nameValid ? "profile__error_visible" : ""
              }`}
            >
              {props.errorMessage
                ? props.errorMessage
                : "Это поле должно содержать хотя бы 2 символа"}
            </span>
            <div className="profile__field">
              <p className="profile__field-name">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                value={email || ""}
                pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$"
                onChange={handleChangeEmail}
              />
            </div>
            <span
              className={`profile__error ${
                !emailValid ? "profile__error_visible" : ""
              }`}
            >
              {props.errorMessage
                ? props.errorMessage
                : "Введите корректный e-mail"}
            </span>
          </fieldset>
          <button
            className="profile__button profile__button_edit"
            type="submit"
            disabled={!isValid}
          >
            {props.isLoading ? "Сохранение..." : "Редактировать"}
          </button>
        </form>
        <button
          onClick={props.onLogOut}
          className="profile__button profile__button_exit"
          type="button"
        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
