import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function MoviesCard(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const currentUser = React.useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = React.useState(false);

  console.log(props.movie);

  let movie = {
    country: props.movie.country || "Не указано",
    director: props.movie.director || "Не указано",
    duration: props.movie.duration || 0,
    year: props.movie.year || "Не указано",
    description: props.movie.description || "Не указано",
    image:
      props.movie.image === null ||
      `https://api.nomoreparties.co${props.movie.image.url}`,
    trailer: props.saved ? props.movie.trailer : props.movie.trailerLink,
    nameRU: props.movie.nameRU || "Не указано",
    nameEN: props.movie.nameEN || "Не указано",
    thumbnail:
      (props.saved && props.movie.thumbnail === null) ||
      `https://api.nomoreparties.co${props.movie.image.url}`,
    movieId: props.saved ? props.movie.movieId : props.movie.id,
    id: props.movie.id,
    saved: isSaved,
  };

  console.log(movie);

  const handleClickSave = () => {
    if (!isSaved) {
      props.createMovie(movie);
      setIsSaved(true);
    } else {
      const movieItem = props.savedMovies.filter(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      props.deleteMovie(movieItem[0]._id);
      setIsSaved(false);
    }
  };

  const handleClickDelete = () => {
    props.deleteMovie(movie._id);
  };

  React.useEffect(() => {
    if (props.savedMovies.length > 0) {
      if (!isSaved) {
        setIsSaved(
          props.savedMovies.some(
            (savedMovie) =>
              savedMovie.movieId === movie.id &&
              savedMovie.owner === currentUser._id
          )
        );
      } else {
        setIsSaved(false);
      }
    }
  }, [currentUser._id, isSaved, movie.id, props.savedMovies]);

  return (
    <article className="movie" _id={props.movie.id}>
      <div className="movie__group">
        <div className="movie__description">
          <h2 className="movie__title">{props.movie.nameRU}</h2>
          <p className="movie__subtitle">{props.movie.duration}</p>
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
        alt={`Кадр из фильма ${props.movie.nameRU}`}
      />
    </article>
  );
}

export default MoviesCard;
