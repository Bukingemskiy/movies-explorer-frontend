import "./App.css";
import React from "react";
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
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
  const history = useHistory();

  function updatePage() {
    setIsMoviesLoading(true);
    Promise.all([mainApi.getUserData(), moviesApi.getMovies()])
      .then(([userInfo, userMovies]) => {
        setCurrentUser(userInfo.data);
        setMovies(userMovies.data);
        setLoggedIn(true);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsMoviesLoading(false));
  }

  React.useEffect(() => {
    updatePage();
  }, []);

  function handleRegister(name, email, password) {
    return auth
      .signUp(name, email, password)
      .then((res) => {
        if (res) {
          history.push("/signin");
        } else {
          console.log("Что-то пошло не так!");
        }
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

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
              <Movies isMoviesLoading={isMoviesLoading} movies={movies} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/saved-movies">
            {loggedIn ? <SavedMovies /> : <Redirect to="/" />}
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
