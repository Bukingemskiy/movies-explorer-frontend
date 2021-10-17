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
  console.log(props.savedMovies);

  const handleClickSave = () => {
    if (!isSaved) {
      console.log(props.movie);
      props.createMovie(props.movie);
      setIsSaved(true);
      console.log(props.savedMovies);
    } else {
      console.log(props.savedMovies);
      const movieItem = props.savedMovies.filter(
        (savedMovie) => savedMovie.movieId === props.movie.id
      );
      console.log(props.movie);
      console.log(props.movie.id);
      props.deleteMovie(movieItem[0].id);
      setIsSaved(false);
    }
  };

  const handleClickDelete = () => {
    props.deleteMovie(props.movie.id);
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
