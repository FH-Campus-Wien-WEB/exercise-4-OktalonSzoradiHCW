import { StatusCodes } from 'http-status-codes'

export function session (_, res) {
  return res.send(StatusCodes.NOT_IMPLEMENTED)
}
