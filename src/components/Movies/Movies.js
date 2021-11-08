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
        movies={props.foundMovies}
        onSearchMovies={props.onSearchMovies}
      />
      <MoviesCardList
        cacheMovies={props.cacheMovies}
        deleteMovie={props.deleteMovie}
        createMovie={props.createMovie}
        savedMovies={props.savedMovies}
        renderMovies={props.renderMovies}
        isLoading={props.isLoading}
        updateMovies={props.updateMovies}
      />
      <Footer />
    </>
  );
}

export default Movies;
