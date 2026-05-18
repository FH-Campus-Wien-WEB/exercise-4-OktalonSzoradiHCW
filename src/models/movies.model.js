// import movies from '../movies.json' with { type: 'json' }
import fs from 'node:fs'
import path from 'node:path'

const filePath = path.resolve('./src/movies.json')
const moviesJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
// const formattedMovies = rawMovies.map(
//   ({
//     imdbID,
//     Title,
//     Released,
//     Runtime,
//     Genre,
//     Director,
//     Writer,
//     Actors,
//     Plot,
//     Poster,
//     Metascore,
//     imdbRating
//   }) => ({
//     imdbID,
//     title: Title,
//     released: dateToISO8601format(Released),
//     runtime: Number.parseInt(Runtime, 10),
//     genres: Genre.split(', ').map(g => g.replace(/-/gu, '\u2011')),
//     directors: Director.split(', '),
//     writers: Writer.split(', '),
//     actors: Actors.split(', '),
//     plot: Plot,
//     poster: Poster,
//     Metascore: Number(Metascore),
//     imdbRating: Number(imdbRating)
//   })
// )

// function dateToISO8601format (input) {
//   const date = input instanceof Date ? input : new Date(input)

//   if (Number.isNaN(date.getTime())) {
//     throw new Error('Invalid date')
//   }

//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')

//   return `${year}-${month}-${day}`
// }

function saveMovies () {
  fs.writeFileSync(filePath, JSON.stringify(moviesJson, null, 2), 'utf8')
}

export function getMoviesJson (username, genre) {
  const movies = moviesJson[username] || {}
  const filtered = {}

  if (genre && genre.toLowerCase() !== 'all') {
    // movies = movies.filter(movie => movie.genres.includes(genre))
    for (const movieID in movies) {
      if (Object.hasOwn(movies, movieID)) {
        const movie = movies[movieID]
        if (movie.genres.includes(genre)) {
          filtered[movieID] = movie
        }
      }
    }
    return filtered
  }

  return movies
}

export function getMovieJson (username, imdbID) {
  const movies = getMoviesJson(username)

  // const movie = formattedMovies.find(m => m.imdbID === imdbID)

  return movies[imdbID]
}

export function editMovieJson (
  username,
  imdbID,
  // {
  //   Title,
  //   Released,
  //   Runtime,
  //   Genres,
  //   Directors,
  //   Writers,
  //   Actors,
  //   Plot,
  //   Poster,
  //   Metascore,
  //   imdbRating
  // }
  newMovie
) {
  if (!moviesJson[username]) {
    moviesJson[username] = {}
  }

  const exists = imdbID in moviesJson[username]

  moviesJson[username][imdbID] = newMovie

  saveMovies()

  return exists
}
