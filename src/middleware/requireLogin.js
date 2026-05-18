import { StatusCodes } from 'http-status-codes'

export function requireLogin (req) {
  const { username } = req.session.user

  if (!(username && `${username}`.trim())) {
    return StatusCodes.UNAUTHORIZED
  }

  return StatusCodes.OK
}
