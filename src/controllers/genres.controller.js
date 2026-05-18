import { StatusCodes } from 'http-status-codes'
import * as model from '../models/genres.model.js'

export function getGenres (req, res) {
  const { username } = req.session.user

  const genres = model.getGenresJson(username)

  return res.status(StatusCodes.OK).json(genres)
}
