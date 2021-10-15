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
  const [, setIsMoviesLoading] = React.useState(false);
  const [, setNotFound] = React.useState(false);
  const [, setIsErrorActive] = React.useState(false);
  const [moviesCache, setMoviesCache] = React.useState([]);

  function updateMovies() {
    setIsMoviesLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsMoviesLoading(false));
  }

  React.useEffect(() => {
    updateMovies();
  }, []);

  console.log(movies);

  function handleSearchMovies(search, searchCheckbox) {
    setIsMoviesLoading(true);
    setIsErrorActive(false);
    setNotFound(false);
    if (isSavedMovies) {
      console.log(movies);
      let filterd = filterMovies(movies, search, searchCheckbox);
      setNotFound(filterd.length === 0);
      setMovies(filterd);
      console.log(movies);
      setIsMoviesLoading(false);
    } else {
      if (moviesCache.length === 0) {
        console.log(movies);
        let filterd = filterMovies(movies, search, searchCheckbox);
        setNotFound(filterd.length === 0);
        setMoviesCache(filterd);
        setMovies(filterd);
        console.log(movies);
        setIsMoviesLoading(false);
      } else {
        console.log(movies);
        let filterd = filterMovies(moviesCache, search, searchCheckbox);
        setNotFound(filterd.length === 0);
        setMovies(filterd);
        console.log(movies);
        setIsMoviesLoading(false);
      }
    }
  }

  return (
    <>
      <Header />
      <SearchForm onSearchMovies={handleSearchMovies} />
      <MoviesCardList movies={movies} isSavedMovies={isSavedMovies} />
      <Footer />
    </>
  );
}

export default Movies;
