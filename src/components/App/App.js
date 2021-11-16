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
  const [foundMovies, setFoundMovies] = React.useState(cacheFoundMovies);
  const [errorMessage, setErrorMessage] = React.useState("");

  console.log(loggedIn);

  React.useEffect(() => {
    if (loggedIn) {
      console.log("update movies");
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
          const moviesItems = movies.map((i) =>
            Object.assign(i, { saved: false })
          );
          savedMovies.length > 0
            ? savedMovies.forEach((el) => {
                const items = moviesItems.map((i) =>
                  i.id === el.movieId ? Object.assign(i, { saved: true }) : i
                );
                localStorage.setItem("localMovies", JSON.stringify(items));
              })
            : localStorage.setItem("localMovies", JSON.stringify(moviesItems));
        })
        .catch((err) => {
          setErrorMessage(`При загрузке страницы произошла ${err}.`);
          console.log(`${err}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn, location.pathname]);

  React.useEffect(() => {}, []);

  function handleLogin(email, password) {
    setIsLoading(true);
    return auth
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
        document.location.reload();
        console.log(loggedIn);
        console.log(foundMovies);
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
          console.log(loggedIn);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 409")
          return setErrorMessage(
            `Пользователь с таким e-mail уже существует. ${err}.`
          );
        setErrorMessage(`При регистрации пользоваеля произошла ${err}.`);
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
        console.log(loggedIn);
        console.log(cacheMovies);
      })
      .catch((err) => {
        setErrorMessage(`При отправке запроса произошла ${err}.`);
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
        console.log(currentUser);
      })
      .catch((err) => {
        if (err === "Ошибка: 409")
          return setErrorMessage(
            `Пользователь с таким e-mail уже существует. ${err}.`
          );
        setErrorMessage(`При обновлении профиля произошла ${err}.`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSearchMovies(search, searchCheckbox) {
    console.log(savedMovies);
    console.log(foundMovies);
    setIsLoading(true);
    setSavedMovies(cacheSavedMovies);
    setFoundMovies(cacheFoundMovies);
    console.log(savedMovies);
    console.log(foundMovies);
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
    setIsLoading(true);
    mainApi
      .makeMovies(data)
      .then((movieInfo) => {
        savedMovies !== null
          ? setSavedMovies([movieInfo.data, ...savedMovies])
          : setSavedMovies([movieInfo.data]);
        console.log(savedMovies);
        localStorage.setItem("localSavedMovies", JSON.stringify(savedMovies));
        console.log(movieInfo);
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
        console.log(nameEN);
        console.log(director);
        console.log(savedMovies);
        const newMovies = savedMovies.filter(
          (savedMovie) => savedMovie._id !== id
        );
        console.log(newMovies);
        console.log(foundMovies);
        const deleteFoundItems = foundMovies.map((i) =>
          i.nameEN === nameEN && i.director === director
            ? Object.assign(i, { saved: false })
            : i
        );
        setFoundMovies(deleteFoundItems);
        console.log(deleteFoundItems);
        localStorage.setItem(
          "localFoundMovies",
          JSON.stringify(deleteFoundItems)
        );
        console.log(savedMovies);
        setSavedMovies(newMovies);
        localStorage.setItem("localSavedMovies", JSON.stringify(newMovies));
      })
      .catch((err) => {
        setErrorMessage(`При отправке запроса произошла ${err}.`);
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
            <Main />
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
            setIsLoading={setIsLoading}
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
            setIsLoading={setIsLoading}
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
