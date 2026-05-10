const fs = require('node:fs')
const path = require('node:path')

const usersFile = path.join(__dirname, 'users.json')
const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'))

module.exports = users
