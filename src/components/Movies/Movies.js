import React from "react";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function Movies(props) {
  return (
    <>
      <Header />
      <SearchForm
        disabledInput={props.disabledInput}
        movies={props.foundMovies}
        onSearchMovies={props.onSearchMovies}
      />
      <MoviesCardList
        foundMovies={props.foundMovies}
        cacheFoundMovies={props.cacheFoundMovies}
        deleteMovie={props.deleteMovie}
        createMovie={props.createMovie}
        cacheMovies={props.cacheMovies}
        savedMovies={props.savedMovies}
        renderMovies={props.renderMovies}
        isLoading={props.isLoading}
        errorMessage={props.errorMessage}
      />
      <Footer />
    </>
  );
}

export default Movies;
