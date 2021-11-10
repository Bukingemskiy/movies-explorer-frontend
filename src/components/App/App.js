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
  const cacheMovies = JSON.parse(localStorage.getItem("localMovies"));
  const history = useHistory();
  const cacheFoundMovies = JSON.parse(localStorage.getItem("localFoundMovies"));
  const cacheSavedMovies = JSON.parse(localStorage.getItem("localSavedMovies"));
  const [savedMovies, setSavedMovies] = React.useState(cacheSavedMovies);
  const [foundMovies, setFoundMovies] = React.useState(cacheFoundMovies);

  function updatePage() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) =>
        savedMovies.length > 0
          ? savedMovies.forEach((el) => {
              const items = movies.map((i) =>
                i.id === el.movieId ? Object.assign(i, { saved: true }) : i
              );
              localStorage.setItem("localMovies", JSON.stringify(items));
              console.log(items);
              console.log(cacheMovies);
            })
          : localStorage.setItem("localMovies", JSON.stringify(movies))
      )
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    console.log("update movies");
    console.log(savedMovies);
    updatePage();
  }, []);

  function updateUserData() {
    setIsLoading(true);
    mainApi
      .getUserData()
      .then((user) => {
        setCurrentUser(user.data);
        console.log(currentUser);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    console.log("update user");
    updateUserData();
  }, []);

  function handleLogin(email, password) {
    return auth
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        updateUserData();
        history.push("/movies");
        console.log(loggedIn);
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
          console.log(loggedIn);
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
        console.log(loggedIn);
        console.log(cacheMovies);
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
        console.log(currentUser);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleSearchMovies(search, searchCheckbox) {
    console.log(savedMovies);
    console.log(foundMovies);
    setSavedMovies(cacheSavedMovies);
    setFoundMovies(cacheFoundMovies);
    console.log(savedMovies);
    console.log(foundMovies);
    setIsLoading(true);
    if (isSavedMovies) {
      let filterd = filterMovies.filterMovies(
        cacheSavedMovies,
        search,
        searchCheckbox
      );
      console.log(filterd);
      setSavedMovies(filterd);
      setIsLoading(false);
    } else {
      let filterd = filterMovies.filterMovies(
        cacheMovies,
        search,
        searchCheckbox
      );
      console.log(cacheMovies);
      console.log(filterd);
      setFoundMovies(filterd);
      localStorage.setItem(
        "localFoundMovies",
        JSON.stringify(filterd.length !== 0 ? filterd : cacheFoundMovies)
      );
      console.log(cacheFoundMovies);
      setIsLoading(false);
    }
  }

  function createMovie(data) {
    mainApi
      .makeMovies(data)
      .then((movieInfo) => {
        setSavedMovies(
          savedMovies !== null
            ? [movieInfo.data, ...savedMovies]
            : [movieInfo.data]
        );
        localStorage.setItem(
          "localSavedMovies",
          JSON.stringify(
            savedMovies !== null
              ? [movieInfo.data, ...savedMovies]
              : [movieInfo.data]
          )
        );
        console.log(movieInfo);
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
        console.log(movieId);
        setSavedMovies(newMovies);
        console.log(savedMovies);
        localStorage.setItem("localSavedMovies", JSON.stringify(newMovies));
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    console.log("update page");
    updatePage();
  }, [location.pathname]);

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
            cacheFoundMovies={cacheFoundMovies}
            cacheMovies={cacheMovies}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            renderMovies={foundMovies !== null ? foundMovies : []}
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
            renderMovies={savedMovies !== null ? savedMovies : []}
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
