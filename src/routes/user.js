import express from 'express'
import * as controllers from '../controllers'
import * as middlewares from '../middleware'

const router = new express.Router()

router.post('/user', controllers.createUser)
router.post('/user/login', controllers.userLogin)
router.get('/findallusernames', controllers.findAllUsernames)
router.get('/user', middlewares.auth, controllers.getUserData)
router.post('/user/username', middlewares.auth, controllers.findByUsername)
router.get('/user/:id', middlewares.auth, controllers.findById)

export const userRouter = router