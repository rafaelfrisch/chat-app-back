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

export const userLogin = async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()
        response.send({ user, token })
    } catch (error) {
        response.status(400).send({'message' : 'Login error', error})
    }
}