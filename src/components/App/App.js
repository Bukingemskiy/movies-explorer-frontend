import "./App.css";
import React from "react";
import { useLocation } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  const [, setIsErrorActive] = React.useState(false);
  const history = useHistory();
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const cacheFoundMovies = JSON.parse(localStorage.getItem("localFoundMovies"));
  const cacheSavedMovies = JSON.parse(localStorage.getItem("localSavedMovies"));

  function updateMovies() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem("localMovies", JSON.stringify(movies));
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    updateMovies();
  }, []);

  function updateUserData() {
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
    updateUserData();
  }, []);

  function handleLogin(email, password) {
    return auth
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        updateUserData();
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
        localStorage.clear();
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
    setFoundMovies([]);
    setIsLoading(true);
    if (isSavedMovies) {
      let filterd = filterMovies.filterMovies(
        savedMovies,
        search,
        searchCheckbox
      );
      setFoundMovies(filterd);
      localStorage.setItem("localSavedMovies", JSON.stringify(filterd));
      setIsLoading(false);
    } else {
      let filterd = filterMovies.filterMovies(movies, search, searchCheckbox);
      setFoundMovies(filterd);
      localStorage.setItem("localFoundMovies", JSON.stringify(filterd));
      setIsLoading(false);
    }
  }

  function createMovie(data) {
    mainApi
      .makeMovies(data)
      .then((movieInfo) => {
        setSavedMovies([movieInfo.data, ...savedMovies]);
        localStorage.setItem(
          "localSavedMovies",
          JSON.stringify([movieInfo.data, ...savedMovies])
        );
      })
      .catch((err) => console.log(err));
  }

  function deleteMovie(movieId) {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const newMovies = savedMovies.filter(
          (savedMovie) => savedMovie._id !== movieId
        );
        setSavedMovies(newMovies);
        localStorage.setItem("localSavedMovies", JSON.stringify(newMovies));
      })
      .catch((err) => console.log(err));
  }

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
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            renderMovies={cacheFoundMovies !== null ? cacheFoundMovies : []}
            movies={movies}
            createMovie={createMovie}
            deleteMovie={deleteMovie}
            onSearchMovies={handleSearchMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            renderMovies={cacheSavedMovies !== null ? cacheSavedMovies : []}
            createMovie={createMovie}
            deleteMovie={deleteMovie}
            onSearchMovies={handleSearchMovies}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            isLoading={isLoading}
            onUpdateUser={handleUpdateUser}
            onLogOut={logOut}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
