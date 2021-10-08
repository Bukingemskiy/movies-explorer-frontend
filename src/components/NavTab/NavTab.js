import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./NavTab.css";

function NavTab() {
  return (
    <>
      <section className="nav-tab">
        <Logo />
        <div className="nav-tab__links">
          <Link to="/signup" className="nav-tab__link">
            Регистрация
          </Link>
          <Link to="/signin" className="nav-tab__link">
            Войти
          </Link>
        </div>
      </section>
    </>
  );
}

export default NavTab;
