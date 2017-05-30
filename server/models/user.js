const mongoose = require('mongoose')

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'Is it that short?']
    }
})

module.exports = { User }