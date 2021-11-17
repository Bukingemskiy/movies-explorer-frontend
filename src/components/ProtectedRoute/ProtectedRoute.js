import { Route, Redirect } from "react-router";

export const ProtectedRoute = ({ loggedIn, ...props }) => {
  return loggedIn ? <Route {...props} /> : <Redirect to="/" />;
};
