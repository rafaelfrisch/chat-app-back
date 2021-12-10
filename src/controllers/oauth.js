import * as models from '../models'
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


export const googleLogin = async (request, response) => {
    try {
        const { token }  = request.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });    
        const { name, email, picture } = ticket.getPayload();

        const user = await models.User.findOneAndUpdate({ email: email }, {username: name, email}, {new: true, upsert: true})    
        const jwtToken = await user.generateAuthToken()
    
        response.status(201).send({ user, token: jwtToken })
    } catch (error) {
        response.status(400).send({'message' : 'Login error', error})
    }
}

