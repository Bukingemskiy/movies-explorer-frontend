import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [isMoreButton, setMoreButton] = React.useState(
    "more__button_invisible"
  );
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
    isSavedMovies
      ? props.setSavedMovies(props.renderMovies)
      : props.setFoundMovies(props.renderMovies);
  }, [isSavedMovies, props]);

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

  function openMore() {
    if (width > 1279) {
      setNumberOfMovies(numberOfMovies + 3);
    } else {
      setNumberOfMovies(numberOfMovies + 2);
    }
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
