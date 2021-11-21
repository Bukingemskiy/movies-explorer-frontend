import React from "react";
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox.js";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [search, setSearch] = React.useState("");
  const [searchValid, setSearchValid] = React.useState(true);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const cacheSearch = JSON.parse(localStorage.getItem("localSearch"));
  const cacheCheckbox = JSON.parse(localStorage.getItem("localCacheCheckbox"));
  const [searchError, setSearchError] = React.useState("search__error");
  const input = document.getElementsByClassName("search__input");
  const [searchCheckbox, setSearchCheckbox] = React.useState(
    cacheCheckbox !== null ? cacheCheckbox : false
  );

  function handleSearchChange(e) {
    setSearch(e.target.value);
    if (props.errorMessage) {
      props.setErrorMessage("");
    }
    setSearchValid(e.target.checkValidity());
    if (!isSavedMovies) {
      localStorage.setItem("localSearch", JSON.stringify(e.target.value));
    }
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    props.onSearchMovies(!isSavedMovies ? cacheSearch : search, searchCheckbox);
    setButtonDisabled(true);
  }

  function handleCheckbox(isToggle) {
    setSearchCheckbox(isToggle);
    if (!isSavedMovies) {
      localStorage.setItem("localCacheCheckbox", JSON.stringify(isToggle));
    }
  }

  function outsideClickListener(e) {
    if (input !== e.target) {
      setSearchError("search__error");
      document.removeEventListener("click", outsideClickListener);
    }
  }

  document.addEventListener("click", outsideClickListener);

  React.useEffect(() => {
    setSearchValid(true);
  }, [location.pathname]);

  React.useEffect(() => {
    search.length === 0 ? setButtonDisabled(true) : setButtonDisabled(false);
  }, [search]);

  React.useEffect(() => {
    searchValid
      ? setSearchError("search__error")
      : setSearchError("search__error search__error_visible");
  }, [searchValid]);

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
            disabled={props.disabledInput}
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
        <span className={searchError}>Введите ключевое слово</span>
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
