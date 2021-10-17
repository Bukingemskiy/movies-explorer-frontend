import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const [isSaved, setIsSaved] = React.useState(false);

  function isValidURL(string) {
    const res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  let movie = {
    country: props.movie.country || "Не указано",
    director: props.movie.director || "Не указано",
    duration: props.movie.duration || 0,
    year: props.movie.year || "Не указано",
    description: props.movie.description || "Не указано",
    image: `https://api.nomoreparties.co${props.movie.image.url}` || "-----",
    trailer: isValidURL(props.movie.trailerLink)
      ? props.movie.trailerLink
      : "-----",
    nameRU: props.movie.nameRU || "Не указано",
    nameEN: props.movie.nameEN || "Не указано",
    thumbnail:
      `https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}` ||
      "-----",
    movieId: props.movie.id,
    id: props.movie.id,
    saved: isSaved,
  };

  console.log(movie);
  console.log(props.savedMovies);

  const handleClickSave = () => {
    if (!isSaved) {
      console.log(movie);
      props.createMovie(movie);
      setIsSaved(true);
      console.log(props.savedMovies);
    } else {
      console.log(props.savedMovies);
      const movieItem = props.savedMovies.filter(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      console.log(movie);
      console.log(movie.id);
      props.deleteMovie(movieItem[0].id);
      setIsSaved(false);
    }
  };

  const handleClickDelete = () => {
    props.deleteMovie(movie.id);
  };

  return (
    <article className="movie" id={movie.id}>
      <div className="movie__group">
        <div className="movie__description">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__subtitle">{movie.duration}</p>
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
              isSaved ? "movie__icon_on" : "movie__icon_off"
            }`}
            type="button"
            onClick={handleClickSave}
          />
        )}
      </div>
      <img
        className="movie__image"
        src={`https://api.nomoreparties.co${props.movie.image.url}`}
        alt={`Кадр из фильма ${movie.nameRU}`}
      />
    </article>
  );
}

export default MoviesCard;
