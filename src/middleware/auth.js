import * as models from '../models'
import * as constants from '../settings'
const jwt = require('jsonwebtoken')

export const auth = async (request, response, next) => {
    try{
        const token = request.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, constants.jwtPrivateKey)
        const user = await models.User.findOne({ _id: decoded._id, 'tokens.token': token})
        
        if(!user){
            return response.status(400).send('Token not found')
        }

        request.user = user
        next()
    } catch (error) {
        response.status(401).send({ error: 'Please authenticate'})
    }
}