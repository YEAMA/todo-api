const mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    text: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})

module.exports = { Todo }