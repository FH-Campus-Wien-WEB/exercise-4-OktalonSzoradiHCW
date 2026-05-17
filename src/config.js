import 'dotenv/config'
import process from 'node:process'

function getEnv (name, { required = false, defaultValue } = {}) {
  // biome-ignore lint/style/noProcessEnv: env vars are validated and centralized here
  const value = process.env[name]

  if (!value || value === null || value === '') {
    if (required) {
      throw new Error(`Missing required environment variable: ${name}`)
    }
    return defaultValue
  }

  return value
}

function getNumber (name, options) {
  const value = getEnv(name, options)
  const num = Number(value)

  if (Number.isNaN(num)) {
    throw new Error(`${name} must be a number`)
  }

  return num
}

export const config = {
  port: getNumber('PORT', { defaultValue: 5000 }),
  omdbApiKey: getEnv('OMDB_API_KEY', { required: true }),
  sessionSecret: getEnv('SESSION_SECRET', { required: true }),
  omdbTimeoutMs: 5000
}
