const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
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
        minlength: [8, 'Password must be at least 8 characters long']
    },
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
})

// Instance method
UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        var password = user.password
        var hash = bcrypt.hashSync(password, 10);
        user.password = hash
    }

    next();
});

// Overriding an existing express method
UserSchema.methods.toJSON = function() {
    var user = this
    var userObject = user.toObject()

    return _.pick(userObject, ['_id', 'email'])
}

// INSTANCE METHOD
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'yeama999').toString()

    user.tokens.push({ access, token })

    return user.save()
        .then((res) => {
            return token;
        })
}

// MODEL METHOD
UserSchema.statics.findByToken = function(token) {
    var User = this,
        decoded;

    try {
        decoded = jwt.verify(token, 'yeama999')
    } catch (e) {
        return Promise.reject()
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access
    })
}

var User = mongoose.model('User', UserSchema)

module.exports = { User }