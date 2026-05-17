import path from 'node:path'
import colors from 'colors'
import dotenv from 'dotenv'
import express from 'express'
// import session from 'express-session'
import morgan from 'morgan'

import genresRoute from './routes/genres.route.js'
import moviesRoute from './routes/movies.route.js'

dotenv.config()
const PORT = process.env.PORT || 5000

const dirname = path.resolve()

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(dirname, '/public')))
app.use(express.json())

// Session middleware
// app.use(
//   session({
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
//   })
// )

app.use('/movies', moviesRoute)
app.use('/genres', genresRoute)

app.listen(PORT, () => {
  console.log(
    colors.blue(`[ i ] Server now listening on http://localhost:${PORT}/`)
  )
})
