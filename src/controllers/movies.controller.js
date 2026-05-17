import chalk from 'chalk'
import { StatusCodes } from 'http-status-codes'
import * as model from '../models/movies.model.js'

export function getMovies (req, res) {
  const { genre } = req.query

  let filter = 'all'
  if (genre) {
    filter = genre
  }

  const movies = model.getMoviesJson(filter)

  return res.status(StatusCodes.OK).json(movies)
}

export async function getMovie (req, res) {
  const { imdbID } = req.params

  const movie = await model.getMovieJson(imdbID)

  if (!movie) {
    res.status(StatusCodes.NOT_FOUND).json('Movie not found.')
  }

  return res.status(StatusCodes.OK).json(movie)
}

/* Task 3.1 and 3.2.
- Add a new PUT endpoint
- Check whether the movie sent by the client already exists
and continue as described in the assignment */
export async function editMovie (req, res) {
  const { imdbID } = req.params

  if (!req.body) {
    res.status(StatusCodes.BAD_REQUEST).json('No request body given.')
    return
  }

  const {
    title,
    released,
    runtime,
    genres,
    directors,
    writers,
    actors,
    plot,
    poster,
    metascore,
    imdbRating
  } = req.body

  console.log(
    chalk.blue(
      `[ i ] controller.editMovie(): PUT /movies/${imdbID}\n` +
        '      Request Body:\n```\n'
    ),
    req.body,
    chalk.blue('\n```')
  )

  const editedMovie = await model.editMovieJson(imdbID, {
    title,
    released,
    runtime,
    genres,
    directors,
    writers,
    actors,
    plot,
    poster,
    metascore,
    imdbRating
  })

  if (!editedMovie) {
    res.status(StatusCodes.NOT_FOUND).json('Movie not found.')
  }

  return res.status(StatusCodes.OK).json(editedMovie)
}
