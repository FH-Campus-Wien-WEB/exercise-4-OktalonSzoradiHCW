import * as api from '../api/movies.api.js'
import { createHtmlElement } from '../util/dom.js'
import { createMovieCard } from './movieCard.js'

/**
 * Removes the active class from all genre filter buttons.
 *
 * This ensures only one genre filter is visually active at a time.
 *
 * @returns {void}
 */
function resetGenreButtonClassLists () {
  for (const genreButton of [
    ...document.querySelectorAll('.genre__button--active')
  ]) {
    genreButton.classList = 'genre__button'
  }
}

/**
 * Creates a genre filter button element that:
 * - Filters movies by genre when clicked
 * - Updates UI active state
 * - Re-renders the movie list
 *
 * @param {string} genre - The genre name (e.g. "Action", "Comedy", "All")
 * @returns {HTMLLIElement} The list item containing the genre button
 */
export function makeGenreFilterButton (genre) {
  const genreFilter = createHtmlElement('li')

  const genreFilterButton = createHtmlElement(
    'button',
    `genre__button${genre === 'All' ? ' genre__button--active' : ''}`,
    genre
  )

  genreFilterButton.type = 'button'

  genreFilterButton.addEventListener('click', async () => {
    resetGenreButtonClassLists()

    genreFilterButton.classList = 'genre__button genre__button--active'

    const movies = document.querySelector('#movies')
    movies.innerHTML = ''

    const response = await api.fetchMovies(genre)

    for (const movie of response) {
      movies.appendChild(createMovieCard(movie))
    }
  })

  genreFilter.appendChild(genreFilterButton)

  return genreFilter
}
