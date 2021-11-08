import React from "react";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function Movies(props) {
  let renderMovies = {
    country: props.renderMovies.country,
    created_at: props.renderMovies.created_at,
    description: props.renderMovies.description,
    director: props.renderMovies.director,
    duration: props.renderMovies.duration,
    id: props.renderMovies.id,
    image: props.renderMovies.image,
    nameEN: props.renderMovies.nameEN,
    nameRU: props.renderMovies.nameRU,
    trailerLink: props.renderMovies.trailerLink,
    updated_at: props.renderMovies.updated_at,
    year: props.renderMovies.year,
    saved: false,
  };

  return (
    <>
      <Header />
      <SearchForm
        movies={props.foundMovies}
        onSearchMovies={props.onSearchMovies}
      />
      <MoviesCardList
        deleteMovie={props.deleteMovie}
        cacheMovies={props.cacheMovies}
        createMovie={props.createMovie}
        savedMovies={props.savedMovies}
        renderMovies={renderMovies}
        isLoading={props.isLoading}
      />
      <Footer />
    </>
  );
}

export default Movies;
