import { Link, useHistory } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const history = useHistory();

  function handleBack() {
    history.goBack();
  }

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link to="" onclick={handleBack} className="not-found__link">
          Назад
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
