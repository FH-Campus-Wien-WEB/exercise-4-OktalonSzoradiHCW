/* eslint-env browser */

function getJson (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () =>
      xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject(xhr)
    xhr.open('GET', url)
    xhr.send()
  })
}

export function fetchMovies (genre) {
  return getJson(genre ? `/movies?genre=${genre}` : '/movies')
}

export function fetchGenres () {
  return getJson('/genres')
}
