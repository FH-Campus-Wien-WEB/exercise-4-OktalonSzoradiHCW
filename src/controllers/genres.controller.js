import { StatusCodes } from 'http-status-codes'
import * as model from '../models/genres.model.js'

export function getGenres (_, res) {
  const genres = model.getGenresJson()

  return res.status(StatusCodes.OK).json(genres)
}
