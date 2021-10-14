import React from "react";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";
import moviesApi from "../../utils/MoviesApi.js";

function Movies() {
  const [movies, setMovies] = React.useState([]);
  const [, setIsMoviesLoading] = React.useState(false);

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

  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
    </>
  );
}

export default Movies;
