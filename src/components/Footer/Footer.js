import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__navigation">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://praktikum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/yandex-praktikum"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://www.facebook.com/yandex.practicum/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
