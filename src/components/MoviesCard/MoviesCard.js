import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Poster from "../../images/Photo.jpg";

function MoviesCard(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const currentUser = React.useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = React.useState(false);
  let movie = {
    country: props.movie.country || "Не указано",
    director: props.movie.director || "Не указано",
    duration: props.movie.duration || 0,
    year: props.movie.year || "Не указано",
    description: props.movie.description || "Не указано",
    image:
      props.movie.image === null || (!props.saved && !props.movie.image.url)
        ? `${Poster}`
        : props.saved
        ? props.movie.image
        : "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgxMjcxNzEwODk5NzA5Mjg4/gettyimages-1304643306.jpg",
    trailer: props.saved ? props.movie.trailer : props.movie.trailerLink,
    nameRU: props.movie.nameRU || "Не указано",
    nameEN: props.movie.nameEN || "Не указано",
    thumbnail:
      (props.saved && props.movie.thumbnail === null) ||
      (!props.saved && props.movie.image === null)
        ? `${Poster}`
        : props.saved
        ? props.movie.thumbnail
        : "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgxMjcxNzEwODk5NzA5Mjg4/gettyimages-1304643306.jpg",
    movieId: props.saved ? props.movie.movieId : props.movie.id,
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
    <article className="movie" id={props.movie.id}>
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
