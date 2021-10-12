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
//import mainApi from "../../utils/MainApi.js";
//import moviesApi from "../../utils/MoviesApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

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
        history.push("/");
      })
      .catch((err) => {
        console.log(`${err}`);
      });
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
            {loggedIn ? <Movies /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/saved-movies">
            {loggedIn ? <SavedMovies /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/profile">
            {loggedIn ? <Profile /> : <Redirect to="/signin" />}
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
