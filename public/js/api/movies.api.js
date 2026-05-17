/* eslint-env browser */

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
 * @typedef {import('../types/movie.type.js').Movie} Movie
 *
 * @param {string} [genre] - Optional genre to filter movies by
 * @returns {Promise<Movie[]>} Resolves with an array of movies
 */
export function fetchMovies (genre) {
  return fetchJson(genre ? `/movies?genre=${genre}` : '/movies')
}

/**
 * Fetches the list of available movie genres from the API.
 *
 * @returns {Promise<string[]>} Resolves with an array of genre names
 */
export function fetchGenres () {
  return fetchJson('/genres')
}
