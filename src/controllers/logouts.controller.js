import { StatusCodes } from 'http-status-codes'

export function logOut (_, res) {
  return res.send(StatusCodes.NOT_IMPLEMENTED)
}
