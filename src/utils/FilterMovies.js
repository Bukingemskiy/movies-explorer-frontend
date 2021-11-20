import { SHORT_MOVIE_DURATION } from "./config.js";

export const filterMovies = (movies, searchMovie, shortMovies) => {
  function checkString(string) {
    const searchValue = searchMovie.toLowerCase().trim();
    return string ? string.includes(searchValue) : false;
  }

  const foundMovies = movies.filter((movie) => {
    if (shortMovies && movie.duration > SHORT_MOVIE_DURATION) return false;
    const string1 = checkString(movie.nameRU);
    const string2 = checkString(movie.nameEN);
    const string3 = checkString(movie.director);
    const string4 = checkString(movie.country);
    const string5 = checkString(movie.year);
    return string1 || string2 || string3 || string4 || string5;
  });

  return foundMovies;
};
