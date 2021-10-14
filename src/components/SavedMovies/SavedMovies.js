import React from "react";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm loggedIn={props.loggedIn} />
      <MoviesCardList loggedIn={props.loggedIn} />
      <Footer loggedIn={props.loggedIn} />
    </>
  );
}

export default SavedMovies;
