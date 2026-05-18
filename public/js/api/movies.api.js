/* eslint-env browser */

/**
 * @typedef {import('../types/movie.type.js').Movie} Movie
 */

/**
 * Fetches JSON data from a given URL using the Fetch API.
 * Throws the response object if the HTTP status is not OK (non-2xx).
 *
 * @template T
 * @param {string} url - The endpoint to fetch data from
 * @returns {Promise<T>} Resolves with parsed JSON data
 * @throws {Response} Throws the fetch Response object on HTTP error
 */
async function fetchJson (url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw response
  }

  return response.json()
}

/**
 * Fetches a list of movies from the API.
 * Optionally filters by genre.
 *
 * @param {string} [genre] - Optional genre to filter movies by
 * @returns {Promise<Movie[]>} Resolves with an array of movies
 */
export function fetchMovies (genre) {
  return fetchJson(genre ? `/movies?genre=${genre}` : '/movies')
}

/**
 * Fetches a single movie by its IMDb ID.
 *
 * @param {string} imdbID - The IMDb ID of the movie (e.g. "tt0133093")
 * @returns {Promise<Movie>} Resolves with the movie object
 */
export function fetchMovie (imdbID) {
  return fetchJson(`/movies/${imdbID}`)
}

/**
 * Updates a movie on the server.
 *
 * @param {string} imdbID
 * @param {Movie} movie
 * @returns {Promise<void>}
 */
export async function updateMovie (imdbID, movie) {
  const response = await fetch(`/movies/${imdbID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  })

  if (!response.ok) {
    throw response
  }

  return response
}

/**
 * Fetches the list of available movie genres from the API.
 *
 * @returns {Promise<string[]>} Resolves with an array of genre names
 */
export function fetchGenres () {
  return fetchJson('/genres')
}
