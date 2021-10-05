import express from 'express'
import * as controllers from '../controllers'
import * as middlewares from '../middleware'

const router = new express.Router()

router.post('/conversation', middlewares.auth, controllers.createConversation)


export const conversationRouter = router