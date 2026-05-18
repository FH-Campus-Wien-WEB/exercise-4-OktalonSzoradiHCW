/* eslint-env browser */
import * as moviesApi from '../api/movies.api.js'
import * as usersApi from '../api/users.api.js'
import { makeGenreFilterButton } from '../components/genreFilterButton.js'
import { createMovieCard } from '../components/movieCard.js'
import { createHtmlElement } from '../util/dom.js'

let currentSession

// DOM roots
const moviesEl = document.querySelector('#movies')
const genresEl = document.querySelector('#genres')
const errorEl = document.querySelector('#server-error')

const guestElements = document.querySelectorAll('.guest')
const loginRequiredElements = document.querySelectorAll('.login-required')

const logOutBtn = document.querySelector('#logOut')

const status = document.querySelector('#status')

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
  // for (const movie of movies) {
  //   moviesEl.appendChild(createMovieCard(movie))
  // }
  for (const movieID in movies) {
    if (Object.hasOwn(movies, movieID)) {
      const movie = movies[movieID]
      moviesEl.appendChild(createMovieCard(movie))
    }
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

function renderLoggedInElements () {
  for (const el of loginRequiredElements) {
    el.hidden = false
  }
  for (const el of guestElements) {
    el.hidden = true
  }
}

/* -------------------------
   LOAD FUNCTIONS
-------------------------- */

async function loadGenres () {
  const genres = await moviesApi.fetchGenres()
  renderGenres(genres)
}

async function loadMovies () {
  const movies = await moviesApi.fetchMovies()

  if (errorEl) {
    errorEl.remove()
  }

  renderMovies(movies)
}

/* -------------------------
   APP ENTRY
-------------------------- */

logOutBtn.onclick = () => {
  currentSession = undefined
  globalThis.location.reload(true)
}

async function loadPage () {
  await Promise.all([loadGenres(), loadMovies()])

  renderLoggedInElements()

  status.textContent = `Hey there, ${currentSession.firstName} ${currentSession.lastName}! You logged in on ${currentSession.loginTime}`
}

function handleLogin () {
  const authBtn = document.querySelector('#authBtn')
  authBtn.onclick = () => {
    const loginForm = document.querySelector('#loginForm')
    loginForm.reset()
    document.querySelector('#loginDialog').showModal()
  }

  // Login dialog
  document.querySelector('#loginForm').addEventListener('submit', async e => {
    e.preventDefault()
    const formData = new FormData(e.target)

    // Task 1.1: Implement the login submit flow to call `POST /login`
    // with username and password, handle errors, save the response
    // into `currentSession`, then call `updateUI()` and `loadMovies()`.
    const username = formData.get('username')
    const password = formData.get('password')

    const response = await usersApi.userLogIn(username, password)

    currentSession = response

    await loadPage()

    document.querySelector('#loginDialog').close()
  })

  document.querySelector('#cancelLogin').addEventListener('click', () => {
    document.querySelector('#loginDialog').close()
  })

  if (currentSession) {
    loadPage()
  }
}

window.onload = () => {
  try {
    handleLogin()
  } catch (err) {
    console.error('Page load failed:', err)
    renderError(err)
  }
}
