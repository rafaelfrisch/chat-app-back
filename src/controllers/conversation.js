import * as models from '../models'

export const createConversation = async (request, response) => {
    try {
        const user = request.user
        const name = request.body.name
        // check if users exists
        const users = await models.User.find({_id : { $in: request.body.users } })

        if(users.length != request.body.users.length || !users)
            return response.status(400).send('Wrong users Ids')

        const newUsersArray = request.body.users
        
        // add current user to conversation
        newUsersArray.push(user._id)

        // check if conversation already Exists
        const checkConversation = await models.Conversation.find({users: newUsersArray })
    
        if(checkConversation.length !=0)
            return response.status(400).send('Conversation Already Exists')
        
        const conversation = new models.Conversation({ users: newUsersArray, name: name })
       
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
            return response.status(400).send('Error')
        
        const conversation = await models.Conversation.findById(request.params.id)
        
        conversation.messages.push({
            text: request.body.message,
            user
        })
        await conversation.save()        
        response.status(201).send(conversation)
    } catch (error) {
        response.status(400).send(error)
    }
}

export const getAllConversationsFromUser = async (request, response) => {
    try {
        const user = request.user
        
        const userConversations = await models.Conversation.find({ 'users': user._id })
        
        response.send(userConversations)

    } catch (error) {
        response.status(400).send(error)
    }
}