import React from "react";
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox.js";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [search, setSearch] = React.useState("");
  const [searchCheckbox, setSearchCheckbox] = React.useState(false);
  const [searchValid, setSearchValid] = React.useState(true);
  const cacheSearch = JSON.parse(localStorage.getItem("localSearch"));

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setSearchValid(e.target.checkValidity());
    if (!isSavedMovies) {
      localStorage.setItem("localSearch", JSON.stringify(e.target.value));
    }
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    props.onSearchMovies(!isSavedMovies ? cacheSearch : search, searchCheckbox);
  }

  function handleCheckbox(isToggle) {
    setSearchCheckbox(isToggle);
  }

  console.log(cacheSearch);
  console.log(search);

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
            value={
              isSavedMovies
                ? search || ""
                : search.length !== 0
                ? search
                : cacheSearch || ""
            }
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
          movies={props.movies}
          search={search}
          onSearchMovies={props.onSearchMovies}
          searchCheckbox={searchCheckbox}
          handleCheckbox={handleCheckbox}
        />
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
