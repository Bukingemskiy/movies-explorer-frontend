import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  const movieDuration =
    props.movie.duration < 60
      ? props.movie.duration + " м."
      : Math.trunc(props.movie.duration / 60) +
        " ч. " +
        (props.movie.duration % 60) +
        " м.";

  const handleClickSave = () => {
    if (!props.movie.saved) {
      props.createMovie(props.movie);
      props.cacheMovies.forEach(function (savedMovie) {
        if (savedMovie.id === props.movie.movieId) {
          savedMovie.saved = true;
          console.log(savedMovie);
        }
      });
      console.log(props.movie);
    } else {
      const movieItem = props.savedMovies.filter(
        (savedMovie) => savedMovie.movieId === props.movie.movieId
      );
      props.deleteMovie(movieItem[0]._id);
      props.movie.saved = false;
    }
  };

  const handleClickDelete = () => {
    props.deleteMovie(props.movie._id);
  };

  React.useEffect(() => {
    if (props.savedMovies.length > 0 && !isSavedMovies) {
      console.log(props.cacheMovies);
      props.cacheMovies.forEach(function (savedMovie) {
        if (savedMovie.id === props.movie.movieId) {
          savedMovie.saved = true;
          console.log(savedMovie);
        }
      });
    }
  }, []);

  return (
    <article className="movie" _id={props.movie._id}>
      <div className="movie__group">
        <div className="movie__description">
          <h2 className="movie__title">{props.movie.nameRU}</h2>
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
              props.movie.saved ? "movie__icon_on" : "movie__icon_off"
            }`}
            type="button"
            onClick={handleClickSave}
          />
        )}
      </div>
      <a
        className="movie__link"
        href={props.movie.trailer}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie__image"
          src={props.movie.image}
          alt={`Кадр из фильма ${props.movie.nameRU}`}
        />
      </a>
    </article>
  );
}

export default MoviesCard;
