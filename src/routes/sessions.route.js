import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/sessions.controller.js'

const router = express.Router()

router.get('/', asyncHandler(controller.session))

export default router
