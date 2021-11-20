import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import * as openMore from "../../utils/OpenMore.js";

function MoviesCardList(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [isMoreButton, setMoreButton] = React.useState(
    "more__button_invisible"
  );
  const [isTitle, setTitle] = React.useState("");
  const cardList = document.getElementsByClassName("movie");
  const [width, setWidth] = React.useState(window.innerWidth);
  const [numberOfMovies, setNumberOfMovies] = React.useState(() => {
    if ((width < 1280) & (width > 767)) {
      return 8;
    } else if (width < 768) {
      return 5;
    } else if (width > 1279) {
      return 12;
    }
  });

  React.useEffect(() => {
    if ((width < 1280) & (width > 767)) {
      setNumberOfMovies(8);
    } else if (width < 768) {
      setNumberOfMovies(5);
    } else if (width > 1279) {
      setNumberOfMovies(12);
    }
  }, [width]);

  React.useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  React.useEffect(() => {
    if (numberOfMovies > cardList.length) {
      setMoreButton("more__button more__button_invisible");
    } else {
      setMoreButton("more__button");
    }
    if (numberOfMovies <= cardList.length) {
      for (let i = numberOfMovies; i < cardList.length; i++) {
        for (let j = 0; j < numberOfMovies; j++) {
          cardList[j].style.display = "block";
          cardList[i].style.display = "none";
        }
      }
    } else {
      for (let i = 0; i < cardList.length; i++) {
        cardList[i].style.display = "block";
      }
    }
  }, [cardList, numberOfMovies]);

  function openButtonMore() {
    setNumberOfMovies(openMore.openMore(width, numberOfMovies, cardList));
  }

  React.useEffect(() => {
    if (props.renderMovies.length === 0) {
      console.log(props.cacheSavedNotFoundMovies);
      console.log(props.cacheSavedMovies);
      console.log(props.cacheFoundMovies);
      if (
        isSavedMovies &&
        props.cacheSavedMovies.length === 0 &&
        props.cacheSavedNotFoundMovies !== null
      )
        return setTitle("Вам ещё ничего не понравилось");
      if (!isSavedMovies && props.cacheFoundMovies === null)
        return setTitle("Вы ещё ничего не искали");
      else return setTitle("Ничего не найдено");
    }
  }, [
    isSavedMovies,
    props.cacheFoundMovies,
    props.cacheSavedMovies,
    props.cacheSavedNotFoundMovies,
    props.renderMovies.length,
  ]);

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
          {isTitle}
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
          <button className={isMoreButton} onClick={openButtonMore}>
            Ещё
          </button>
        )}
      </section>
    </>
  );
}

export default MoviesCardList;
