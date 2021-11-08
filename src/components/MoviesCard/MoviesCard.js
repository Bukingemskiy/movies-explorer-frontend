import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

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

  const movieDuration =
    props.movie.duration < 60
      ? props.movie.duration + " м."
      : Math.trunc(props.movie.duration / 60) +
        " ч. " +
        (props.movie.duration % 60) +
        " м.";

  const handleClickSave = () => {
    if (!props.movie.saved) {
      props.createMovie(movie);
      props.movie.saved = true;
    } else {
      const movieItem = props.savedMovies.filter(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      props.deleteMovie(movieItem[0]._id);
      props.movie.saved = false;
    }
  };

  const handleClickDelete = () => {
    props.deleteMovie(movie._id);
  };

  React.useEffect(() => {
    if (props.savedMovies.length > 0 && !isSavedMovies) {
      console.log(props.renderMovies);
      const movieItem = props.renderMovies.filter(
        (savedMovie) => savedMovie.id === movie.movieId
      );
      console.log(movie);
      console.log(movieItem);
      movieItem[0].saved = true;
    }
  }, []);

  return (
    <article className="movie" _id={movie._id}>
      <div className="movie__group">
        <div className="movie__description">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__subtitle">{movieDuration}</p>
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
