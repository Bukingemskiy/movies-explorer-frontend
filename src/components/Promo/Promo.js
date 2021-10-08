import "./Promo.css";
import Logo from "../../images/Logo-main.png";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__description">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a href="#about-project" className="promo__link">
          Узнать больше
        </a>
      </div>
      <img className="promo__image" src={Logo} alt="Логотип проекта" />
    </section>
  );
}

export default Promo;
