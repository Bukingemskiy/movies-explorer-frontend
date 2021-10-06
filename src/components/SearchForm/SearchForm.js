import "./SearchForm.css";

window.addEventListener("resize", function () {
  window.location.reload();
});

function SearchForm() {
  if (window.innerWidth < 768) {
    return (
      <section className="search">
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
        <div className="search__filter">
          <div className="search__filter-icon">
            <div className="search__icon-ring"></div>
          </div>
          <p className="search__filter-text">Короткометражки</p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="search">
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
          <div className="search__filter">
            <div className="search__filter-icon">
              <div className="search__icon-ring"></div>
            </div>
            <p className="search__filter-text">Короткометражки</p>
          </div>
        </form>
        <div className="search__border-bottom"></div>
      </section>
    );
  }
}

export default SearchForm;
