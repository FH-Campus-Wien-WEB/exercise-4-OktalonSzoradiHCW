import path from 'node:path'
import chalk from 'chalk'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'

import { config } from './config.js'

import genresRoute from './routes/genres.route.js'
import moviesRoute from './routes/movies.route.js'

const dirname = path.resolve()

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(dirname, '/public')))
app.use(express.json())

// Session middleware
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
)

app.use('/movies', moviesRoute)
app.use('/genres', genresRoute)

app.listen(config.port, () => {
  console.log(
    chalk.blue(`[ i ] Server now listening on http://localhost:${config.port}/`)
  )
})
