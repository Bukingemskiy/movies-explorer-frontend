import { useHistory } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const history = useHistory();

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button
          type="button"
          onСlick={() => history.go(-2)}
          className="not-found__link"
        >
          Назад
        </button>
      </div>
    </section>
  );
}

export default NotFound;
