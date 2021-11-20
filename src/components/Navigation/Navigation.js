import "./Navigation.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import IconProfile from "../../images/Profile.svg";

function Navigation(props) {
  const location = useLocation();
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

  return (
    <nav className="navigation">
      <div className="navigation__links">
        <Link
          to="/movies"
          className={
            location.pathname === "/movies"
              ? "navigation__link navigation__link_selected"
              : "navigation__link"
          }
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className={
            location.pathname === "/saved-movies"
              ? "navigation__link navigation__link_selected"
              : "navigation__link"
          }
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
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "navigation__popup-link navigation__popup-link_selected"
                  : "navigation__popup-link"
              }
            >
              Главная
            </Link>
            <Link
              to="/movies"
              className={
                location.pathname === "/movies"
                  ? "navigation__popup-link navigation__popup-link_selected"
                  : "navigation__popup-link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                location.pathname === "/saved-movies"
                  ? "navigation__popup-link navigation__popup-link_selected"
                  : "navigation__popup-link"
              }
            >
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
