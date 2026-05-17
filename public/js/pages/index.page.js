/* eslint-env browser */
import * as api from '../api/movies.api.js'
import { makeGenreFilterButton } from '../components/genreFilterButton.js'
import { createMovieCard } from '../components/movieCard.js'
import { createHtmlElement } from '../util/dom.js'

// DOM roots
const moviesEl = document.querySelector('#movies')
const genresEl = document.querySelector('#genres')
const errorEl = document.querySelector('#server-error')

/* -------------------------
   RENDER FUNCTIONS
-------------------------- */

function renderGenres (genres) {
  genresEl.appendChild(makeGenreFilterButton('All'))

  for (const genre of genres) {
    genresEl.appendChild(makeGenreFilterButton(genre))
  }
}

function renderMovies (movies) {
  for (const movie of movies) {
    moviesEl.appendChild(createMovieCard(movie))
  }
}

function renderError (error) {
  moviesEl.classList = 'movies movies__error'

  const li = createHtmlElement('li')

  li.append(
    createHtmlElement(
      'h2',
      null,
      `${error.status ?? 'Error'} • ${error.statusText ?? ''}`
    ),
    createHtmlElement('p', null, 'Could not load movies')
  )

  moviesEl.append(li)
}

/* -------------------------
   LOAD FUNCTIONS
-------------------------- */

async function loadGenres () {
  const genres = await api.fetchGenres()
  renderGenres(genres)
}

async function loadMovies () {
  const movies = await api.fetchMovies()

  if (errorEl) {
    errorEl.remove()
  }

  renderMovies(movies)
}

/* -------------------------
   APP ENTRY
-------------------------- */

window.onload = async () => {
  try {
    await Promise.all([loadGenres(), loadMovies()])
  } catch (err) {
    console.error('Page load failed:', err)
    renderError(err)
  }
}
