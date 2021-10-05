import * as models from '../models'
import { jwtPrivateKey } from '../settings'
const jwt = require('jsonwebtoken')

export const auth = async (request, response, next) => {
    try{
        const token = request.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, jwtPrivateKey)
        const user = await models.User.findOne({ _id: decoded._id, 'tokens.token': token})
        
        if(!user){
            throw new Error()
        }

        request.user = user
        next()
    } catch (error) {
        response.status(401).send({ error: 'Please authenticate'})
    }
}