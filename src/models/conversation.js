const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    users: [{
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    }],
    messages: [{
        text: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        time: {
            type: Date, 
            default: Date.now 
        }
    }],
    started: {
        type: Date,
        default: Date.now
    }
})

export const Conversation = mongoose.model('Conversation', conversationSchema)