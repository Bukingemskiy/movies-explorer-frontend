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

  console.log(props.errorMessage);
  console.log(emailValid);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
    setNameValid(e.target.checkValidity());
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setEmailValid(e.target.checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      email: email,
    });
  }

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
                onChange={handleChangeName}
              />
            </div>
            <span
              className={`profile__error ${
                !nameValid ? "profile__error_visible" : ""
              }`}
            >
              {props.errorMessage}
            </span>
            <div className="profile__field">
              <p className="profile__field-name">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                value={email || ""}
                onChange={handleChangeEmail}
              />
            </div>
            <span
              className={`profile__error ${
                !emailValid ? "profile__error_visible" : ""
              }`}
            >
              {props.errorMessage}
            </span>
          </fieldset>
          <button
            className="profile__button profile__button_edit"
            type="submit"
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
