import fs from 'node:fs'
import path from 'node:path'

const filePath = path.resolve('./src/users.json')
export const usersJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
