import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import * as movieDuration from "../../utils/MovieDuration.js";

function MoviesCard(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  function isURL(str) {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  let movie = {
    country: props.movie.country || "Не указано",
    director: props.movie.director || "Не указано",
    duration: props.movie.duration || 0,
    year: props.movie.year || "Не указано",
    description: props.movie.description || "Не указано",
    image: isSavedMovies
      ? props.movie.image
      : `https://api.nomoreparties.co${props.movie.image.url}`,
    trailer: isSavedMovies
      ? isURL(props.movie.trailer)
        ? props.movie.trailer
        : props.movie.image
      : isURL(props.movie.trailerLink)
      ? props.movie.trailerLink
      : `https://api.nomoreparties.co${props.movie.image.url}`,
    nameRU: props.movie.nameRU || "Не указано",
    nameEN: props.movie.nameEN || "Не указано",
    thumbnail: isSavedMovies
      ? props.movie.thumbnail
      : `https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}`,
    movieId: props.movie.id,
    _id: props.movie._id,
    saved: props.movie.saved,
  };

  const handleClickSave = () => {
    if (movie.saved !== true) {
      props.createMovie(movie);
      const items = props.cacheMovies.map((i) =>
        i.id === movie.movieId ? Object.assign(i, { saved: true }) : i
      );
      localStorage.setItem("localMovies", JSON.stringify(items));
      const foundItems = props.foundMovies.map((i) =>
        i.id === movie.movieId ? Object.assign(i, { saved: true }) : i
      );
      localStorage.setItem("localFoundMovies", JSON.stringify(foundItems));
    } else {
      const deleteItems = props.cacheMovies.map((i) =>
        i.id === movie.movieId ? Object.assign(i, { saved: false }) : i
      );
      localStorage.setItem("localMovies", JSON.stringify(deleteItems));
      const deleteFoundItems = props.foundMovies.map((i) =>
        i.id === movie.movieId ? Object.assign(i, { saved: false }) : i
      );
      localStorage.setItem(
        "localFoundMovies",
        JSON.stringify(deleteFoundItems)
      );
      const movieItem = props.savedMovies.filter(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      props.deleteMovie(movieItem[0]._id);
    }
  };

  const handleClickDelete = () => {
    props.deleteMovie(movie._id, movie.nameEN, movie.director);
  };

  React.useEffect(() => {}, [
    props.savedMovies,
    props.foundMovies,
    props.cacheMovies,
    location.pathname,
  ]);

  return (
    <article className="movie" _id={movie._id}>
      <div className="movie__group">
        <div className="movie__description">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__subtitle">
            {movieDuration.movieDuration(movie.duration)}
          </p>
        </div>
        {isSavedMovies ? (
          <button
            className="movie__icon movie__icon_delete"
            type="button"
            onClick={handleClickDelete}
          />
        ) : (
          <button
            className={`movie__icon  ${
              movie.saved ? "movie__icon_on" : "movie__icon_off"
            }`}
            type="button"
            onClick={handleClickSave}
          />
        )}
      </div>
      <a
        className="movie__link"
        href={movie.trailer}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie__image"
          src={movie.image}
          alt={`Кадр из фильма ${movie.nameRU}`}
        />
      </a>
    </article>
  );
}

export default MoviesCard;
