import express from 'express'
import * as controllers from '../controllers'
import * as middlewares from '../middleware'

const router = new express.Router()

router.post('/user', controllers.createUser)
router.post('/user/login', controllers.userLogin)
router.get('/user', middlewares.auth, controllers.getUserData)

export const userRouter = router