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
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesItems, setMoviesItems] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState(cacheFoundMovies);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([
        moviesApi.getMovies(),
        mainApi.getSavedMovies(),
        mainApi.getUserData(),
      ])
        .then(([movies, savedItems, user]) => {
          setSavedMovies(savedItems.data);
          localStorage.setItem(
            "localSavedMovies",
            JSON.stringify(savedItems.data)
          );
          setCurrentUser(user.data);
          setMoviesItems(movies.map((i) => Object.assign(i, { saved: false })));
        })
        .catch((err) => {
          setErrorMessage(`При загрузке страницы произошла ошибка ${err}.`);
          console.log(`${err}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    savedMovies.length > 0
      ? savedMovies.forEach((el) => {
          const items = moviesItems.map((i) =>
            i.id === el.movieId ? Object.assign(i, { saved: true }) : i
          );
          localStorage.setItem("localMovies", JSON.stringify(items));
        })
      : localStorage.setItem("localMovies", JSON.stringify(moviesItems));
  }, [moviesItems, savedMovies]);

  function handleLogin(email, password) {
    setIsLoading(true);
    return auth
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
        document.location.reload();
      })
      .catch((err) => {
        if (err === "Ошибка: 401")
          return setErrorMessage(`Введен неверный e-mail или пароль. ${err}.`);
        setErrorMessage(`Попробуйте ещё раз! ${err}.`);
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister(name, email, password) {
    setIsLoading(true);
    return auth
      .signUp(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 409")
          return setErrorMessage(
            `Пользователь с таким e-mail уже существует. ${err}.`
          );
        setErrorMessage(`При регистрации пользоваеля произошла ошибка ${err}.`);
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function logOut() {
    setIsLoading(true);
    return auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
      })
      .catch((err) => {
        setErrorMessage(`При отправке запроса произошла ошибка ${err}.`);
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editProfile(data)
      .then((user) => {
        setCurrentUser(user.data);
        setErrorMessage("Данные профиля успешно изменены");
      })
      .catch((err) => {
        if (err === "Ошибка: 409")
          return setErrorMessage(
            `Пользователь с таким e-mail уже существует. ${err}.`
          );
        setErrorMessage(`При обновлении профиля произошла ошибка ${err}.`);
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSearchMovies(search, searchCheckbox) {
    setIsLoading(true);
    setSavedMovies(cacheSavedMovies);
    setFoundMovies(cacheFoundMovies);
    if (isSavedMovies) {
      let filterd = filterMovies.filterMovies(
        cacheSavedMovies,
        search,
        searchCheckbox
      );
      setSavedMovies(filterd);
      setIsLoading(false);
    } else {
      let filterd = filterMovies.filterMovies(
        cacheMovies,
        search,
        searchCheckbox
      );
      setFoundMovies(filterd);
      localStorage.setItem(
        "localFoundMovies",
        JSON.stringify(filterd.length !== 0 ? filterd : cacheFoundMovies)
      );
      setIsLoading(false);
    }
    document.location.reload();
  }

  function createMovie(data) {
    setIsLoading(true);
    mainApi
      .makeMovies(data)
      .then((movieInfo) => {
        savedMovies !== null
          ? setSavedMovies([movieInfo.data, ...savedMovies])
          : setSavedMovies([movieInfo.data]);
        localStorage.setItem("localSavedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        setErrorMessage(`При отправке запроса произошла ошибка ${err}.`);
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function deleteMovie(id, nameEN, director) {
    setIsLoading(true);
    mainApi
      .deleteMovie(id)
      .then(() => {
        const newMovies = savedMovies.filter(
          (savedMovie) => savedMovie._id !== id
        );
        const deleteFoundItems = foundMovies.map((i) =>
          i.nameEN === nameEN && i.director === director
            ? Object.assign(i, { saved: false })
            : i
        );
        setFoundMovies(deleteFoundItems);
        localStorage.setItem(
          "localFoundMovies",
          JSON.stringify(deleteFoundItems)
        );
        setSavedMovies(newMovies);
        localStorage.setItem("localSavedMovies", JSON.stringify(newMovies));
      })
      .catch((err) => {
        setErrorMessage(`При отправке запроса произошла ошибка ${err}.`);
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    setErrorMessage("");
  }, [location.pathname]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <Route exact path="/signup">
            <Register
              isLoading={isLoading}
              onRegister={handleRegister}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Route>
          <Route exact path="/signin">
            <Login
              isLoading={isLoading}
              onLogin={handleLogin}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            cacheMovies={cacheMovies}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            renderMovies={foundMovies !== null ? foundMovies : []}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
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
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            createMovie={createMovie}
            deleteMovie={deleteMovie}
            onSearchMovies={handleSearchMovies}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            isLoading={isLoading}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
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
