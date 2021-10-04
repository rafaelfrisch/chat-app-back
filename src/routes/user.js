import express from 'express'
import * as controllers from '../controllers';

const router = new express.Router()

router.post('/user', controllers.createUser)

module.exports = router