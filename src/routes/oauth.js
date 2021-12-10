import express from 'express'
import * as controllers from '../controllers'

const router = new express.Router()

router.post('/api/v1/auth/google', controllers.googleLogin)

export const oAuthRouter = router