const mongoose = require('mongoose')
const validator = require('validator')

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'Is it that short?'],
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
})

module.exports = { User }