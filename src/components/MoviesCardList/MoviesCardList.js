import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [, setIsLoading] = React.useState(false);
  const [isMoreButton, setMoreButton] = React.useState(
    "more__button_invisible"
  );
  const cardList = document.getElementsByClassName("movie");
  const width = window.innerWidth;
  let numberOfMovies = 12;

  React.useEffect(() => {
    if ((width < 1280) & (width > 767)) {
      numberOfMovies = 8;
      console.log("8");
    } else if (width < 768) {
      numberOfMovies = 5;
      console.log("5");
    } else if (width > 1279) {
      numberOfMovies = 12;
      console.log("12");
    }
  }, [width]);

  function handleMoreButton() {
    if (numberOfMovies > cardList.length) {
      setMoreButton("more__button more__button_invisible");
      console.log("invisible");
    } else {
      setMoreButton("more__button");
      console.log("visible");
    }
  }

  function handleWidth() {
    handleMoreButton();
    for (let i = numberOfMovies; i < cardList.length; i++) {
      if (numberOfMovies <= cardList.length) {
        for (let j = 0; j < numberOfMovies; j++) {
          cardList[j].style.display = "block";
          cardList[i].style.display = "none";
        }
        console.log("number");
      } else {
        for (let j = 0; j < cardList.length; j++) {
          cardList[j].style.display = "block";
          cardList[i].style.display = "none";
        }
        console.log("card");
      }
    }
  }

  window.onload = function () {
    handleWidth();
    console.log("update width page");
  };

  function resize() {
    setIsLoading(true);
    setTimeout(handleWidth, 100);
    console.log("100");
    setIsLoading(false);
  }

  window.onresize = resize;

  function openMore() {
    if (width > 1279) {
      numberOfMovies += 3;
      console.log("3");
    } else {
      numberOfMovies += 2;
      console.log("2");
    }
    handleMoreButton();
    if (numberOfMovies <= cardList.length) {
      for (let i = 0; i < numberOfMovies; i++) {
        cardList[i].style.display = "block";
      }
      console.log("number");
    } else {
      for (let i = 0; i < cardList.length; i++) {
        cardList[i].style.display = "block";
      }
      console.log("card");
    }
  }

  console.log(props.renderMovies);

  return (
    <>
      <Preloader isLoading={props.isLoading} />
      <div>
        <span
          className={`movies__error ${
            props.errorMessage ? "movies__error_visible" : ""
          }`}
        >
          {props.errorMessage}
        </span>
        <span
          className={`movies__not-found ${
            props.renderMovies.length === 0 ? "movies__not-found_visible" : ""
          }`}
        >
          {isSavedMovies
            ? "Вам ещё ничего не понравилось"
            : "Ничего не найдено"}
        </span>
      </div>
      <section className="movies">
        {props.renderMovies.map((movie) => (
          <MoviesCard
            foundMovies={props.foundMovies}
            cacheMovies={props.cacheMovies}
            renderMovies={props.renderMovies}
            savedMovies={props.savedMovies}
            deleteMovie={props.deleteMovie}
            createMovie={props.createMovie}
            movie={movie}
            key={movie.id ? movie.id : movie.movieId}
          />
        ))}
      </section>
      <section className="more">
        {isSavedMovies ? (
          <></>
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
