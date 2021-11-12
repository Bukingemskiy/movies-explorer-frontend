import React from "react";
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox.js";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [search, setSearch] = React.useState("");
  const [cacheCheckbox, setCacheCheckbox] = JSON.parse(
    localStorage.getItem("localCacheCheckbox")
  );
  const [searchValid, setSearchValid] = React.useState(true);
  const cacheSearch = JSON.parse(localStorage.getItem("localSearch"));

  function handleSearchChange(e) {
    setSearch(e.target.value);
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
    console.log(cacheCheckbox);
    props.onSearchMovies(!isSavedMovies ? cacheSearch : search, cacheCheckbox);
  }

  function handleCheckbox(isToggle) {
    console.log(isToggle);
    setCacheCheckbox(
      localStorage.setItem("localCacheCheckbox", JSON.stringify(isToggle))
    );
  }

  React.useEffect(() => {
    console.log("update search");
  }, [cacheCheckbox, location.pathname]);

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
          cacheSearch={cacheSearch}
          onSearchMovies={props.onSearchMovies}
          cacheCheckbox={cacheCheckbox !== null ? cacheCheckbox : false}
          handleCheckbox={handleCheckbox}
        />
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
