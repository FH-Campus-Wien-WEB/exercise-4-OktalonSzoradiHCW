import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/searches.controller.js'

const router = express.Router()

router.get('/', asyncHandler(controller.search))

export default router
