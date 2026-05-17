import * as moviesModel from './movies.model.js'

let genres = []

export function getGenresJson () {
  let collectedGenres = []

  const movies = moviesModel.getMoviesJson()

  for (const movie of movies) {
    for (const genre of movie.genres) {
      if (!collectedGenres.includes(genre)) {
        collectedGenres.push(genre)
      }
    }
  }

  collectedGenres = collectedGenres.sort()

  if (JSON.stringify(genres) !== JSON.stringify(collectedGenres)) {
    genres = collectedGenres
  }

  return genres
}
