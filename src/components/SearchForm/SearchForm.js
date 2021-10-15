import React from "react";
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox.js";

function SearchForm(props) {
  const [search, setSearch] = React.useState("");
  const [searchCheckbox, setSearchCheckbox] = React.useState(false);
  const [searchValid, setSearchValid] = React.useState(true);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setSearchValid(e.target.checkValidity());
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    props.onSearchMovies(search, searchCheckbox);
  }

  function handleCheckbox(isToggle) {
    setSearchCheckbox(isToggle);
  }

  return (
    <section className="search">
      <div className="search__box">
        <form className="search__form" onSubmit={handleSearchMovies}>
          <div className="search__icon"></div>
          <input
            className="search__input"
            type="text"
            name="search"
            placeholder="Фильм"
            value={search || ""}
            onChange={handleSearchChange}
            required
          />
          <span
            className={`search__error ${
              !searchValid ? "search__error_visible" : ""
            }`}
          >
            Введите ключевое слово
          </span>
          <button className="search__button" type="submit">
            Найти
          </button>
        </form>
        <FilterCheckBox
          searchCheckbox={searchCheckbox}
          handleCheckbox={handleCheckbox}
        />
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
