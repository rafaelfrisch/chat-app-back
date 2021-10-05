import { User } from '../models/user'

export const createUser = async (request, response) => {
    const user = new User(request.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        response.status(201).send({ user, token })
    }
    catch(error) {
        response.status(400).send(error)
    }
}