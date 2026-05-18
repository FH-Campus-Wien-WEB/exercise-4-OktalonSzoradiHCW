import * as moviesModel from './movies.model.js'

let genres = []

export function getGenresJson (username) {
  let collectedGenres = []

  const movies = moviesModel.getMoviesJson(username)

  for (const movieID in movies) {
    if (Object.hasOwn(movies, movieID)) {
      const movie = movies[movieID]
      for (const genre of movie.genres) {
        if (!collectedGenres.includes(genre)) {
          collectedGenres.push(genre)
        }
      }
    }
  }

  collectedGenres = collectedGenres.sort()

  if (JSON.stringify(genres) !== JSON.stringify(collectedGenres)) {
    genres = collectedGenres
  }

  return genres
}
