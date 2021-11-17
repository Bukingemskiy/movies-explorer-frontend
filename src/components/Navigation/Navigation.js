import "./Navigation.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import IconProfile from "../../images/Profile.svg";

function Navigation() {
  const history = useHistory();
  const [popupVisible, setPopupVisible] = React.useState("none");
  const [, setOptionsVisible] = React.useState("none");

  function openPopup() {
    setPopupVisible("flex");
    setOptionsVisible("none");
  }

  function closePopup() {
    setPopupVisible("none");
    setOptionsVisible("block");
  }

  function pathname() {
    history.push("/saved-movies");
    document.location.reload();
  }

  return (
    <nav className="navigation">
      <div className="navigation__links">
        <Link to="/movies" className="navigation__link">
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className="navigation__link"
          onClick={pathname}
        >
          Сохранённые фильмы
        </Link>
      </div>
      <div onClick={openPopup} className="navigation__options"></div>
      <Link to="/profile" className="navigation__profile">
        <img
          src={IconProfile}
          alt="Иконка аккаунта"
          className="navigation__icon"
        />
        <p className="navigation__text">Аккаунт</p>
      </Link>
      {popupVisible === "flex" && (
        <div
          style={{
            display: popupVisible,
          }}
          className="navigation__popup"
        >
          <button
            type="button"
            className="navigation__close"
            onClick={closePopup}
          >
            +
          </button>
          <div className="navigation__popup-links">
            <Link to="/" className="navigation__popup-link">
              Главная
            </Link>
            <Link to="/movies" className="navigation__popup-link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="navigation__popup-link">
              Сохранённые фильмы
            </Link>
          </div>
          <Link
            to="/profile"
            className="navigation__profile navigation__profile_popup"
          >
            <img
              src={IconProfile}
              alt="Иконка аккаунта"
              className="navigation__icon"
            />
            <p className="navigation__text">Аккаунт</p>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
