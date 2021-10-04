import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import movies from "../../utils/initial-сards.js";

function MoviesCardList() {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [isMoreButton, setMoreButton] = React.useState(
    "more__button_invisible"
  );
  const savedMovies = movies.filter((movie) => movie.saved === true);
  const cardList = document.getElementsByClassName("movie");
  let numberOfMovies = 12;

  if ((window.screen.width < 1280) & (window.screen.width > 767)) {
    numberOfMovies = 8;
  } else if (window.screen.width < 768) {
    numberOfMovies = 5;
  }

  window.onload = function () {
    handleMoreButton();
    for (let i = numberOfMovies; i < cardList.length; i++) {
      cardList[i].style.display = "none";
    }
  };

  function handleMoreButton() {
    if (numberOfMovies > cardList.length) {
      setMoreButton("more__button more__button_invisible");
    } else {
      setMoreButton("more__button");
    }
  }

  function openMore() {
    numberOfMovies += numberOfMovies;
    handleMoreButton();
    if (numberOfMovies <= cardList.length) {
      for (let i = 0; i < numberOfMovies; i++) {
        cardList[i].style.display = "block";
      }
    } else {
      for (let i = 0; i < cardList.length; i++) {
        cardList[i].style.display = "block";
      }
    }
  }

  return (
    <>
      <Preloader />
      <section className="movies">
        {isSavedMovies
          ? savedMovies.map((movie) => (
              <MoviesCard movie={movie} key={movie._id} />
            ))
          : movies.map((movie) => <MoviesCard movie={movie} key={movie._id} />)}
      </section>
      <section className="more">
        {isSavedMovies ? (
          <button className={isMoreButton} onClick={openMore}>
            Ещё
          </button>
        ) : (
          <button className={isMoreButton} onClick={openMore}>
            Ещё
          </button>
        )}
      </section>
    </>
  );
}

export default MoviesCardList;
