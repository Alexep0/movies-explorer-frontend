import { beatfilmUrl } from "./constants";

class MoviesApi {
    constructor(options) {
      this._baseUrl = options;
      this._headers = {
        "Content-type": "application/json",
      };
    }

    _handleResponse(res) {
      if (res.ok) return res.json()
      return Promise.reject("Ошибка: " + res.message);
    }

    async getMovies() {
      const res = await fetch(this._baseUrl, {
        headers: this._headers
      })

      return this._handleResponse(res);
    }
}
 
export const moviesApi = new MoviesApi(beatfilmUrl);