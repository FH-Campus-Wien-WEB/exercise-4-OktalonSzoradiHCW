import { createHtmlElement } from '../util/dom.js'
import { createList } from './list.js'
import { createSection } from './section.js'

/**
 * @typedef {import('../types/movie.type.js').Movie} Movie
 */

/**
 * Creates a complete movie card list item element.
 *
 * @param {Movie} movie - Movie data used to populate the card.
 * @returns {HTMLLIElement} An <li> element containing the movie card.
 */
export function createMovieCard (movie) {
  const li = createHtmlElement('li', 'movies__li')
  const movieCard = createHtmlElement('article', 'movie')
  li.appendChild(movieCard)

  const imageWrapper = createHtmlElement('picture', 'movie__poster-area')
  const image = createHtmlElement('img', 'movie__poster')
  image.src = movie.poster
  image.alt = `Movie poster for ${movie.title}`
  imageWrapper.appendChild(image)

  const title = createHtmlElement('h2', 'movie__title', movie.title)

  const metadata = createHtmlElement(
    'span',
    'movie__runtime-and-release',
    /* eslint-disable no-irregular-whitespace */
    [
      `${movie.runtime ? `Runtime: ${movie.runtime} minutes` : ''}`,
      `Released: ${movie.released}`,
      `${movie.metascore ? `Metascore: ${movie.metascore}` : ''}`,
      `${movie.imdbRating ? `IMDb Rating: ${movie.imdbRating}` : ''}`
    ]
      .filter(md => Boolean(md))
      .join(' • ')
    /* eslint-enable no-irregular-whitespace */
  )

  const genres = createList(movie.genres, 'movie__genres', 'movie__genre')

  const description = createHtmlElement('p', 'movie__description', movie.plot)

  const directors = createSection(
    'Director',
    movie.directors,
    'movie__directors',
    'movie__director'
  )

  const writers = createSection(
    'Writer',
    movie.writers,
    'movie__writers',
    'movie__writer'
  )

  const actors = createSection(
    'Actor',
    movie.actors,
    'movie__actors',
    'movie__actor'
  )

  const buttonArea = createHtmlElement('footer', 'movie__button-area')
  const buttonEdit = createHtmlElement('a', 'movie__button', 'Edit')
  buttonEdit.href = `/edit.html?imdbID=${movie.imdbID}`
  buttonEdit.addEventListener('click', () => {
    buttonEdit.classList.toggle('movie__button--active')
    setTimeout(() => {
      buttonEdit.classList.toggle('movie__button--active')
    }, 1000)
  })
  buttonArea.appendChild(buttonEdit)

  movieCard.append(
    imageWrapper,
    title,
    metadata,
    genres,
    description,
    directors,
    writers,
    actors,
    buttonArea
  )

  return li
}
