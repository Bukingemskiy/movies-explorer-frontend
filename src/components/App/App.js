import "./App.css";
import React from "react";
import { useLocation } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Main from "../Main/Main.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../utils/MainApi.js";
import moviesApi from "../../utils/MoviesApi.js";
import * as filterMovies from "../../utils/FilterMovies.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth.js";

function App(initialLoggedIn) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  const useLoggedInState = createPersistedState(false);
  const [loggedIn, setLoggedIn] = useLoggedInState(initialLoggedIn);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [, setNotFound] = React.useState(false);
  const [, setIsErrorActive] = React.useState(false);
  const history = useHistory();
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [moviesCache, setMoviesCache] = React.useState([]);
  const storageOfFoundMovies = localStorage.getItem("foundMovies");
  const storageOfSavedMovies = localStorage.getItem("savedMovies");

  function updateMovies() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    updateMovies();
  }, []);

  function updatePage() {
    setIsLoading(true);
    mainApi
      .getUserData()
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    updatePage();
  }, []);

  function handleLogin(email, password) {
    return auth
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        updatePage();
        history.push("/movies");
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleRegister(name, email, password) {
    return auth
      .signUp(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        } else {
          console.log("Что-то пошло не так!");
        }
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function logOut() {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editProfile(data)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleSearchMovies(search, searchCheckbox) {
    setIsErrorActive(false);
    setNotFound(false);
    setFoundMovies([]);
    setIsLoading(true);
    if (isSavedMovies) {
      let filterd = filterMovies.filterMovies(
        savedMovies,
        search,
        searchCheckbox
      );
      setNotFound(filterd.length === 0);
      setFoundMovies(filterd);
      setIsLoading(false);
    } else {
      let filterd = filterMovies.filterMovies(movies, search, searchCheckbox);
      setNotFound(filterd.length === 0);
      setMoviesCache(filterd);
      setFoundMovies(filterd);
      setIsLoading(false);
    }
  }

  const createMovie = (movie) => {
    setIsLoading(true);
    const localMovies = JSON.parse(localStorage.getItem("movies"));
    const localSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const localFoundMovies = JSON.parse(localStorage.getItem("foundMovies"));

    const movieCopy = localMovies.filter((i) => i.id === movie.id)[0];

    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id,
    } = movieCopy;

    const movieToAdd = {
      country: country || "---",
      director: director || "---",
      duration: duration || 0,
      year: year || "----",
      description: description || "----",
      image: `https://api.nomoreparties.co${image.url}`,
      trailer: trailerLink,
      thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
      nameRU: nameRU || "----",
      nameEN: nameEN || "----",
      movieId: id,
    };

    mainApi
      .makeMovies(movieToAdd)
      .then((newMovie) => {
        const newLocalSavedMovies = [
          ...localSavedMovies,
          {
            nameRU: newMovie.nameRU,
            id: newMovie.id,
            movieId: newMovie.movieId,
            trailer: newMovie.trailer,
            duration: newMovie.duration,
            image: newMovie.image,
          },
        ];

        localStorage.setItem(
          "savedMovies",
          JSON.stringify(newLocalSavedMovies)
        );
        setSavedMovies(newLocalSavedMovies);

        const newMovies = localMovies.map((movie) =>
          movie.id === newMovie.movieId
            ? Object.assign(movie, { saved: true }, { _id: newMovie._id })
            : movie
        );
        const newMoviesFound = movies.map((movie) =>
          movie.id === newMovie.movieId
            ? Object.assign(movie, { saved: true }, { _id: newMovie._id })
            : movie
        );
        const newLocalMoviesFound = localFoundMovies.map((movie) =>
          movie.id === newMovie.movieId
            ? Object.assign(movie, { saved: true }, { _id: newMovie._id })
            : movie
        );
        setMovies(newMoviesFound);
        localStorage.setItem("movies", JSON.stringify(newMovies));
        localStorage.setItem(
          "moviesFound",
          JSON.stringify(newLocalMoviesFound)
        );
      })
      .catch(() =>
        setIsErrorActive(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        )
      )
      .finally(() => setIsLoading(false));
  };

  const deleteMovie = (movie) => {
    setIsLoading(true);
    const localSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const localMovies = JSON.parse(localStorage.getItem("movies"));
    const localFoundMovies = JSON.parse(localStorage.getItem("foundMovies"));
    const id = movie.id;

    mainApi
      .deleteMovie(id)
      .then((deletedMovie) => {
        const newLocalSavedMovies = localSavedMovies.filter(
          (m) => m.id !== deletedMovie.message.id
        );
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(newLocalSavedMovies)
        );

        setSavedMovies(newLocalSavedMovies);

        const newMovies = localMovies.map((movie) =>
          movie.id === deletedMovie.message.movieId
            ? Object.assign(movie, { saved: false })
            : movie
        );
        const newMoviesFound = movies.map((movie) =>
          movie.id === deletedMovie.message.movieId
            ? Object.assign(movie, { saved: false })
            : movie
        );
        const newLocalMoviesFound = localFoundMovies.map((movie) =>
          movie.id === deletedMovie.message.movieId
            ? Object.assign(movie, { saved: false })
            : movie
        );
        setMovies(newMoviesFound);
        localStorage.setItem("movies", JSON.stringify(newMovies));
        localStorage.setItem(
          "foundMovies",
          JSON.stringify(newLocalMoviesFound)
        );
      })
      .catch((err) => {
        setIsErrorActive(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/movies">
            {loggedIn ? (
              <Movies
                isLoading={isLoading}
                savedMovies={savedMovies}
                foundMovies={foundMovies}
                renderMovies={isSavedMovies ? savedMovies : foundMovies}
                movies={movies}
                createMovie={createMovie}
                deleteMovie={deleteMovie}
                onSearchMovies={handleSearchMovies}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/saved-movies">
            {loggedIn ? (
              <SavedMovies
                isLoading={isLoading}
                savedMovies={savedMovies}
                foundMovies={foundMovies}
                renderMovies={isSavedMovies ? savedMovies : foundMovies}
                createMovie={createMovie}
                deleteMovie={deleteMovie}
                onSearchMovies={handleSearchMovies}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/profile">
            {loggedIn ? (
              <Profile
                isLoading={isLoading}
                onUpdateUser={handleUpdateUser}
                onLogOut={logOut}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
