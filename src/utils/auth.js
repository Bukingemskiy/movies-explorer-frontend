export const BASE_URL = "https://api.prof.movies.explorer.nomoredomains.club";

function _getAnswer(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function signUp(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => _getAnswer(res));
}

export function signIn(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => _getAnswer(res));
}

export function signOut() {
  return fetch(`${BASE_URL}/users/signout`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => _getAnswer(res));
}
