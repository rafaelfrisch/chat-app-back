import { User } from '../models/user'

export const createUser = async (request, response) => {
    const user = new User(request.body)

    try {
        await user.save()
        response.status(201).send({ user })
    }
    catch(error) {
        response.status(400).send(error)
    }
}