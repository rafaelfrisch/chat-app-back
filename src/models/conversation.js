const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
}, {
    timestamps: true
})

export const Conversation = mongoose.model('Conversation', conversationSchema)