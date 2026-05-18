import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { usersJson } from '../models/users.model.js'

export function logIn (req, res) {
  const { username, password } = req.body
  const user = usersJson[username]
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = {
      username,
      firstName: user.firstName,
      lastName: user.lastName,
      loginTime: new Date().toISOString()
    }
    res.send(req.session.user)
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
  }
}
