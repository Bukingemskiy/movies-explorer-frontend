import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox.js";

function SearchForm(props) {
  return (
    <section className="search">
      <div className="search__box">
        <form className="search__form">
          <div className="search__icon"></div>
          <input
            className="search__input"
            type="text"
            name="search"
            placeholder="Фильм"
            required
          />
          <span className="search__error"></span>
          <button className="search__button" type="submit">
            Найти
          </button>
        </form>
        <FilterCheckBox loggedIn={props.loggedIn} />
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
