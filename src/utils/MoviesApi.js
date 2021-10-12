class MoviesApi {
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

  getMovies() {
    return fetch(this._address, {
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }
}

const config = {
  address: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const moviesApi = new MoviesApi(config);

export default moviesApi;
