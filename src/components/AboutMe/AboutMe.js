import "./AboutMe.css";
import Photo from "../../images/Photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__description">
        <div className="about-me__text">
          <h2 className="about-me__name">Владислав</h2>
          <h3 className="about-me__profession">Фронтенд-разработчик, 28 лет</h3>
          <p className="about-me__subtitle">
            Я родился и живу в Рязани, окончил Рязанский Государственный
            Радиотехнический Университет по специальности "Прикладная математика
            и информатика". Женат и счастлив в браке. В свободное время пилю
            панк-рок и играю в мини-футбол. Яндекс.Практикум стал моим первым
            опытом в веб-разработке.
          </p>
          <a
            className="about-me__link"
            href="https://www.instagram.com/mistertoxicofficial/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="about-me__link"
            href="https://github.com/Bukingemskiy"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={Photo}
          alt="Фотография студента"
        />
      </div>
    </section>
  );
}

export default AboutMe;
