import React from "react";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function Movies(props) {
  return (
    <>
      <Header />
      <SearchForm movies={props.movies} onSearchMovies={props.onSearchMovies} />
      <MoviesCardList
        movies={props.movies}
        savedMovies={props.savedMovies}
        foundMovies={props.foundMovies}
        isLoading={props.isLoading}
      />
      <Footer />
    </>
  );
}

export default Movies;
