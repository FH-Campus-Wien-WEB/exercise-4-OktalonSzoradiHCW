/* eslint-env browser */
import * as api from '../api/movies.api.js'
import { createHtmlElement } from '../util/dom.js'

/* -------------------------
   DOM REFERENCES
-------------------------- */

const $ = {
  title: document.querySelector('h1.title'),
  form: document.forms[0],
  movieSection: document.querySelector('#movie'),
  errorSection: document.querySelector('#server-error'),
  saveButton: document.querySelector('#movie-form__button--save')
}

/* -------------------------
   URL PARAM
-------------------------- */

const imdbID = new URLSearchParams(globalThis.location.search).get('imdbID')

/* -------------------------
   RENDER
-------------------------- */

function renderMovie (movie) {
  document.title = `Editing ${movie.title} – Movies!`
  $.title.textContent = `Editing ${movie.title}`

  for (const element of $.form.elements) {
    if (!element.name) {
      continue
    }

    const { name } = element
    const value = movie[name]

    if (name === 'genres') {
      for (const option of element.options) {
        option.selected = value.includes(option.value)
      }
    } else {
      element.value = value
    }
  }
}

function renderError (error) {
  $.errorSection.classList = 'movies movies__error'

  const section = createHtmlElement('section')

  section.append(
    createHtmlElement(
      'h2',
      null,
      `${error.status ?? 'Error'} • ${error.statusText ?? ''}`
    ),
    createHtmlElement('p', null, "Could not load this movie's data")
  )

  $.errorSection.append(section)
}

/* -------------------------
   FORM SERIALIZATION
-------------------------- */

function getMovieFromForm () {
  const movie = {}

  for (const element of $.form.elements) {
    if (!element.name) {
      continue
    }

    const { name, value } = element

    let parsedValue

    if (name === 'genres') {
      parsedValue = Array.from(element.options)
        .filter(o => o.selected)
        .map(o => o.value)
    } else if (['metascore', 'runtime', 'imdbRating'].includes(name)) {
      parsedValue = Number(value)
    } else if (['actors', 'directors', 'writers'].includes(name)) {
      parsedValue = value
        .split(',')
        .map(v => v.trim())
        .filter(Boolean)
    } else {
      parsedValue = value
    }

    movie[name] = parsedValue
  }

  return movie
}

/* -------------------------
   ACTIONS
-------------------------- */

async function loadMovie () {
  const movie = await api.fetchMovie(imdbID)

  $.errorSection.hidden = true
  $.movieSection.hidden = false

  renderMovie(movie)
}

async function saveMovie () {
  const movie = getMovieFromForm()

  await api.updateMovie(imdbID, movie)

  location.href = '/'
}

/* -------------------------
   EVENTS
-------------------------- */

function bindEvents () {
  $.saveButton.addEventListener('click', async () => {
    try {
      await saveMovie()
    } catch (err) {
      console.error(
        `Saving failed: ${err.status ?? ''} ${
          err.statusText ?? ''
        }\n\nCheck console for details.`
      )
      console.error('PUT /movies failed', err)
    }
  })
}

/* -------------------------
   INIT
-------------------------- */

window.onload = async () => {
  try {
    bindEvents()
    await loadMovie()
  } catch (err) {
    console.error('Load failed:', err)
    renderError(err)
  }
}
