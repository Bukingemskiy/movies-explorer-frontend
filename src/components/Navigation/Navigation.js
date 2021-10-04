import "./Navigation.css";
import React from "react";
import { Link } from "react-router-dom";
import IconProfile from "../../images/Profile.svg";

function Navigation() {
  const [popupVisible, setPopupVisible] = React.useState("none");
  const [optionsVisible, setOptionsVisible] = React.useState("block");

  function openPopup() {
    setPopupVisible("flex");
    setOptionsVisible("none");
  }

  function closePopup() {
    setPopupVisible("none");
    setOptionsVisible("block");
  }

  if (window.screen.width < 1024) {
    return (
      <section className="navigation">
        <div
          style={{
            display: popupVisible,
          }}
          className="navigation__popup"
        >
          <button onClick={closePopup} className="navigation__close">
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
            style={{
              margin: "auto auto 90px",
            }}
            to="/profile"
            className="navigation__profile"
          >
            <img
              src={IconProfile}
              alt="Иконка аккаунта"
              className="navigation__icon"
            />
            <p className="navigation__text">Аккаунт</p>
          </Link>
        </div>
        <div
          style={{
            display: optionsVisible,
          }}
          onClick={openPopup}
          className="navigation__options"
        ></div>
      </section>
    );
  } else {
    return (
      <section className="navigation">
        <div className="navigation__links">
          <Link to="/movies" className="navigation__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="navigation__link">
            Сохранённые фильмы
          </Link>
        </div>
        <Link to="/profile" className="navigation__profile">
          <img
            src={IconProfile}
            alt="Иконка аккаунта"
            className="navigation__icon"
          />
          <p className="navigation__text">Аккаунт</p>
        </Link>
      </section>
    );
  }
}

export default Navigation;
