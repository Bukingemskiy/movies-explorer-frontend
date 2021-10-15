function filterMovies(movies, searchMovie, shortMovies) {
  const searchValue = searchMovie.toLowerCase().trim();

  function checkString(string) {
    return string ? string.includes(searchValue) : false;
  }

  function searchMovies() {
    const foundMovies = movies.filter((movie) => {
      if (shortMovies && movie.duration > 40) return false;
      const string1 = checkString(movie.nameRU);
      const string2 = checkString(movie.nameEN);
      const string3 = checkString(movie.director);
      const string4 = checkString(movie.country);
      const string5 = checkString(movie.year);
      return string1 || string2 || string3 || string4 || string5;
    });

    return foundMovies;
  }

  searchMovies();
}

export default filterMovies;
