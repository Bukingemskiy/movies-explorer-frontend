import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";
import moviesApi from "../../utils/MoviesApi.js";
import * as filterMovies from "../../utils/FilterMovies.js";

function Movies() {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [movies, setMovies] = React.useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
  const [, setNotFound] = React.useState(false);
  const [, setIsErrorActive] = React.useState(false);
  const [moviesCache, setMoviesCache] = React.useState([]);

  function handleSearchMovies(search, searchCheckbox) {
    setIsErrorActive(false);
    setNotFound(false);
    setMovies([]);
    if (isSavedMovies) {
      console.log(movies);
      let filterd = filterMovies.filterMovies(movies, search, searchCheckbox);
      setNotFound(filterd.length === 0);
      setMovies(filterd);
    } else {
      setIsMoviesLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
          let filterd = filterMovies.filterMovies(
            movies,
            search,
            searchCheckbox
          );
          setNotFound(filterd.length === 0);
          setMoviesCache(filterd);
          setMovies(filterd);
        })
        .catch((err) => console.log(`${err}`))
        .finally(() => setIsMoviesLoading(false));
    }
  }

  return (
    <>
      <Header />
      <SearchForm onSearchMovies={handleSearchMovies} />
      <MoviesCardList
        movies={movies}
        isSavedMovies={isSavedMovies}
        isMoviesLoading={isMoviesLoading}
      />
      <Footer />
    </>
  );
}

export default Movies;
