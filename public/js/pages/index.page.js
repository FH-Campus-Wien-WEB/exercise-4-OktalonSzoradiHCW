/* eslint-env browser */
import * as api from '../api/movies.api.js'
import { makeGenreFilterButton } from '../components/genreFilterButton.js'
import { createMovieCard } from '../components/movieCard.js'
import { createHtmlElement } from '../util/dom.js'

function makeGenre (genre) {
  const genres = document.querySelector('#genres')
  const genreFilterButton = makeGenreFilterButton(genre)
  genres.appendChild(genreFilterButton)
}

async function handleGenres () {
  try {
    const response = await api.fetchGenres()
    makeGenre('All')
    for (const genre of response) {
      makeGenre(genre)
    }
  } catch (fetchError) {
    console.error('Could not GET /genres', fetchError)
  }
}

window.onload = async () => {
  const movies = document.querySelector('#movies')
  try {
    const response = await api.fetchMovies()

    const errorMessage = document.querySelector('#server-error')
    errorMessage.remove()

    handleGenres()
    for (const movie of response) {
      movies.appendChild(createMovieCard(movie))
    }
  } catch (fetchError) {
    movies.classList = 'movies movies__error'
    const li = createHtmlElement('li')
    li.append(
      createHtmlElement(
        'h2',
        null,
        `${fetchError.status} • ${fetchError.statusText}`
      ),
      createHtmlElement('p', null, 'Could not GET /movies')
    )
    movies.append(li)
    console.error('Could not GET /movies', fetchError)
  }
}
