import express from 'express'
import * as controllers from '../controllers'
import * as middlewares from '../middleware'

const router = new express.Router()

router.post('/conversation', middlewares.auth, controllers.createConversation)
router.put('/conversation/:id', middlewares.auth, controllers.newMessage)
router.get('/conversation', middlewares.auth, controllers.getAllConversations)

export const conversationRouter = router