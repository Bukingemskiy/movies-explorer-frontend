import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  const [isSaved, setIsSaved] = React.useState(props.movie.saved);
  const handleClickSave = () => setIsSaved(!isSaved);

  return (
    <article className="movie" _id={props.movie.id}>
      <div className="movie__group">
        <div className="movie__description">
          <h2 className="movie__title">{props.movie.nameRU}</h2>
          <p className="movie__subtitle">{props.movie.duration}</p>
        </div>
        {isSavedMovies ? (
          <button className="movie__icon movie__icon_delete" type="button" />
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
        src={props.movie.image}
        alt={`Кадр из фильма ${props.movie.nameRU}`}
      />
    </article>
  );
}

export default MoviesCard;
