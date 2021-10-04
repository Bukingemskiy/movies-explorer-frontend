import "./Profile.css";
import Header from "../Header/Header.js";

function Profile() {
  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <fieldset className="profile__fields">
            <div className="profile__field">
              <p className="profile__field-name">Имя</p>
              <input
                className="profile__input"
                type="text"
                name="name"
                placeholder="Виталий"
              />
            </div>
            <div className="profile__field">
              <p className="profile__field-name">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                placeholder="pochta@yandex.ru"
              />
            </div>
          </fieldset>
          <button
            className="profile__button profile__button_edit"
            type="submit"
          >
            Редактировать
          </button>
        </form>
        <button className="profile__button profile__button_exit" type="button">
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
