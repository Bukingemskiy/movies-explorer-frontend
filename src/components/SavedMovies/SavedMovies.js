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
        movies={props.savedMovies}
        onSearchMovies={props.onSearchMovies}
      />
      <MoviesCardList
        deleteMovie={props.deleteMovie}
        createMovie={props.createMovie}
        savedMovies={props.savedMovies}
        renderMovies={props.renderMovies}
        isLoading={props.isLoading}
        errorMessage={props.errorMessage}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
