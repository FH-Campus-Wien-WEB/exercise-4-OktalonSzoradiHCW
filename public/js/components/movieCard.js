import { createHtmlElement } from '../util/dom.js'
import { createList } from './list.js'
import { createSection } from './section.js'

/**
 * @typedef {import('../types/movie.type.js').Movie} Movie
 */

/** @param {Movie} movie */
export function createMovieCard (movie) {
  const li = createHtmlElement('li', 'movies__li')
  const movieCard = createHtmlElement('article', 'movie')
  li.appendChild(movieCard)

  const image = createHtmlElement('img', 'movie__poster')
  image.src = movie.poster
  image.alt = `Movie poster for ${movie.title}`

  const title = createHtmlElement('h2', 'movie__title', movie.title)

  const metadata = createHtmlElement(
    'span',
    'movie__runtime-and-release',
    [
      movie.runtime && `Runtime: ${movie.runtime} minutes`,
      `Released: ${movie.released}`,
      movie.metascore && `Metascore: ${movie.metascore}`,
      movie.imdbRating && `IMDb Rating: ${movie.imdbRating}`
    ]
      .filter(Boolean)
      .join(' • ')
  )

  const buttonEdit = createHtmlElement('a', 'movie__button', 'Edit')
  buttonEdit.href = `/edit.html?imdbID=${movie.imdbID}`
  buttonEdit.addEventListener('click', () => {
    buttonEdit.classList.add('movie__button--active')
    setTimeout(() => {
      buttonEdit.classList.remove('movie__button--active')
    }, 1000)
  })

  movieCard.append(
    image,
    title,
    metadata,
    createList(movie.genres, 'movie__genres', 'movie__genre'),
    createHtmlElement('p', 'movie__description', movie.plot),
    createSection(
      'Director',
      movie.directors,
      'movie__directors',
      'movie__director'
    ),
    createSection('Writer', movie.writers, 'movie__writers', 'movie__writer'),
    createSection('Actor', movie.actors, 'movie__actors', 'movie__actor'),
    createHtmlElement('footer', 'movie__button-area').appendChild(buttonEdit)
  )

  return li
}
