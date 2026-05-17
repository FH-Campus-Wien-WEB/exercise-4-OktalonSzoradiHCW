import * as api from '../api/movies.api.js'
import { createHtmlElement } from '../util/dom.js'
import { createMovieCard } from './movieCard.js'

function resetGenreButtonClassLists () {
  for (const genreButton of [
    ...document.querySelectorAll('.genre__button--active')
  ]) {
    genreButton.classList = 'genre__button'
  }
}

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
