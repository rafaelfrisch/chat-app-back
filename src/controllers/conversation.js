import { compile } from 'morgan'
import * as models from '../models'

export const createConversation = async (request, response) => {
    try {
        const user = request.user

        if(!user)
            throw new Error()
        
        // check if users exists
        const users = await models.User.find({_id : { $in: request.body.users } })

        if(!users)
            throw new Error()

        const newUsersArray = request.body.users.map((userId) => {
            const userElement = {
                user: userId
            }
            return userElement
        })
        
        const conversation = new models.Conversation({ users: newUsersArray })
       
        await conversation.save()

        response.status(201).send(conversation)

    } catch (error) {
        response.status(400).send(error)
    }
}

export const newMessage = async (request, response) => {
    try {
        const user = request.user
        if(!user || !request.params.id || !request.body.message)
            throw new Error()
        
        const conversation = await models.Conversation.findById(request.params.id)
        
        conversation.messages.push({
            text: request.body.message,
            user
        })
        await conversation.save()        
        response.send(conversation)
    } catch (error) {
        response.status(400).send(error)
    }
}

export const getAllConversations = async (request, response) => {
    try {
        const user = request.user
        if(!user)
            throw new Error()
        
        const userConversations = await models.Conversation.find({'users.user': user})
        
        response.send(userConversations)

    } catch (error) {
        response.status(400).send(error)
    }
}