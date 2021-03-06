import React from "react";
import Promo from "../Promo/Promo.js";
import NavTab from "../NavTab/NavTab.js";
import Header from "../Header/Header.js";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Portfolio from "../Portfolio/Portfolio.js";
import Footer from "../Footer/Footer.js";

function Main(props) {
  return (
    <>
      {props.loggedIn ? <Header /> : <NavTab />}
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
}

export default Main;
