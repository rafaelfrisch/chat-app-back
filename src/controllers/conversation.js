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

        const conversation = new models.Conversation({ users: request.body.users })
       
        await conversation.save()

        response.status(201).send(users)

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