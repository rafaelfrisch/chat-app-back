import * as models from '../models'
import * as constants from '../settings'
const jwt = require('jsonwebtoken')

const socketController = async (token, callback) => {
    const decoded = jwt.verify(token, constants.jwtPrivateKey)
    const user = await models.User.findOne({ _id: decoded._id, 'tokens.token': token})
    const userConversations = await models.Conversation.find({ 'users': user._id }).populate('users', ['username', '_id'])

    callback({
      status: "ok",
      conversations: userConversations
    });
}

export default socketController