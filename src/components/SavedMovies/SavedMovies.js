import React from "react";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function SavedMovies(props) {
  return (
    <>
      <Header />
      <SearchForm
        disabledInput={props.disabledInput}
        movies={props.savedMovies}
        onSearchMovies={props.onSearchMovies}
      />
      <MoviesCardList
        deleteMovie={props.deleteMovie}
        createMovie={props.createMovie}
        savedMovies={props.savedMovies}
        cacheSavedMovies={props.cacheSavedMovies}
        cacheSavedNotFoundMovies={props.cacheSavedNotFoundMovies}
        renderMovies={props.renderMovies}
        isLoading={props.isLoading}
        errorMessage={props.errorMessage}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
