import React from "react";
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox.js";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [search, setSearch] = React.useState("");
  const cacheCheckbox = JSON.parse(localStorage.getItem("localCacheCheckbox"));
  const [searchCheckbox, setSearchCheckbox] = React.useState(
    cacheCheckbox !== null ? cacheCheckbox : false
  );
  const [searchValid, setSearchValid] = React.useState(true);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const cacheSearch = JSON.parse(localStorage.getItem("localSearch"));

  console.log(cacheCheckbox);
  console.log(props.errorMessage);
  console.log(searchValid);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    if (props.errorMessage) {
      props.setErrorMessage("");
    }
    setSearchValid(e.target.checkValidity());
    console.log(search);
    console.log(searchValid);
    if (!isSavedMovies) {
      localStorage.setItem("localSearch", JSON.stringify(e.target.value));
    }
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    console.log(cacheSearch);
    console.log(search);
    console.log(searchCheckbox);
    console.log(cacheCheckbox);
    props.onSearchMovies(!isSavedMovies ? cacheSearch : search, searchCheckbox);
  }

  function handleCheckbox(isToggle) {
    console.log(isToggle);
    setSearchCheckbox(isToggle);
    if (!isSavedMovies) {
      localStorage.setItem("localCacheCheckbox", JSON.stringify(isToggle));
    }
    console.log(cacheCheckbox);
  }

  React.useEffect(() => {
    console.log("update search");
  }, [cacheCheckbox, location.pathname, searchValid, buttonDisabled]);

  React.useEffect(() => {
    setSearchValid(true);
  }, [location.pathname]);

  React.useEffect(() => {
    console.log(search.length);
    search.length === 0 ? setButtonDisabled(true) : setButtonDisabled(false);
  }, [search.length]);

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
            minLength="1"
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
          <button
            className="search__button"
            type="submit"
            disabled={buttonDisabled}
          >
            {props.isLoading ? "Поиск..." : "Найти"}
          </button>
        </form>
        <span
          className={`search__error ${
            !searchValid ? "search__error_visible" : ""
          }`}
        >
          Введите ключевое слово
        </span>
        <FilterCheckBox
          movies={props.movies}
          search={search}
          cacheSearch={cacheSearch}
          onSearchMovies={props.onSearchMovies}
          cacheCheckbox={cacheCheckbox}
          searchCheckbox={searchCheckbox}
          handleCheckbox={handleCheckbox}
        />
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
