import { backendUrl } from "./constants";

export default class MainApi {
    constructor() {
      this._baseUrl = backendUrl;
      this._headers = {
        "Content-Type": "application/json",
      };
    }

    _handleResponse(res) {
      if (res.ok) return res.json()
      return Promise.reject("Ошибка: " + res.message);
    }

    async signIn(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          email,
          password
        })
      }).then(this._handleResponse);
    }

    async signUp(name, email, password) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          email,
          password 
        })
      }).then(this._handleResponse);
    }

    async getUser(jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          ...this._headers,
          "Authorization": `${jwt}`
        }
      }).then(this._handleResponse);
    }

    async updateUser(name, email, jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          ...this._headers,
          "Authorization": `${jwt}`
        },
        body: JSON.stringify({
          name, email
        })
      }).then(this._handleResponse);
    }

    async getSavedMovies(jwt) {
      return fetch(`${this._baseUrl}/movies`, {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        }
      }).then(this._handleResponse);
    }

    async saveMovie(data, jwt) {
      return fetch(`${this._baseUrl}/movies`, {
        method: "POST",
        headers: {
          ...this._headers,
          "Authorization": `${jwt}`,
        },
        body: JSON.stringify(
          data
        )
      }).then(this._handleResponse);
    }

    async deleteMovie(movieId, jwt) {
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          ...this._headers,
          "Authorization": `${jwt}`,
        }
      }).then(this._handleResponse);
    }

    // async getSaved() {
    //   return fetch(`${this._baseUrl}/movies`, {
    //     headers: this._headers,
    //     )
    // }
}

