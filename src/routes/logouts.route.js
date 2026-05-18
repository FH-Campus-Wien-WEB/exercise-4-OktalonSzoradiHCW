import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/logouts.controller.js'

const router = express.Router()

router.post('/', asyncHandler(controller.logOut))

export default router
