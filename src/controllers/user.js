import { request, response } from 'express'
import * as models from '../models'

export const createUser = async (request, response) => {
    const user = new models.User(request.body)

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
        const user = await models.User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()
        response.send({ user, token })
    } catch (error) {
        response.status(400).send({'message' : 'Login error', error})
    }
}

export const getUserData = async (request, response) => {
    try {
        const user = request.user
        if(!user)
            throw new Error()
        response.send(user)
    } catch (error) {
        response.status(404).send({'message': 'User not Found', error})
    }
}

export const findByUsername = async (request, response) => {
    try {
        const user = await models.User.findOne({ username: request.body.username })
        response.send({ id: user._id })
    } catch (error) {
        response.status(404).send({'message': 'User not Found', error})
    }
}

export const findById = async (request, response) => {
    try {
        const user = await models.User.findById(request.params.id)
        response.send({ username: user.username })
    } catch (error) {
        response.status(404).send({'message': 'User not Found', error})
    }
}
