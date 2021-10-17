class MainApi {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  _getAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._address}/users/me `, {
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me `, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, email: data.email }),
    }).then((res) => this._getAnswer(res));
  }

  makeMovies(movie) {
    return fetch(`${this._address}/movies`, {
      credentials: "include",
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
      }),
    }).then((res) => this._getAnswer(res));
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._address}/movies/${movieId}`, {
      credentials: "include",
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }
}

const config = {
  address: "https://api.prof.movies.explorer.nomoredomains.club",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const mainApi = new MainApi(config);

export default mainApi;
