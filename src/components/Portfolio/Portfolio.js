import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__list">
          <p className="portfolio__text">Статичный сайт</p>
          <a
            className="portfolio__link"
            href="https://bukingemskiy.github.io/learn-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
          </a>
        </li>
        <li className="portfolio__list">
          <p className="portfolio__text">Адаптивный сайт</p>
          <a
            className="portfolio__link"
            href="https://bukingemskiy.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
          </a>
        </li>
        <li className="portfolio__list">
          <p className="portfolio__text">Одностраничное приложение</p>
          <a
            className="portfolio__link"
            href="https://project.mesto.nomoredomains.club/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
