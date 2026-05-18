import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/logins.controller.js'

const router = express.Router()

router.post('/', asyncHandler(controller.logIn))

export default router
