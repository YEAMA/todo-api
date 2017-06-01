// const { SHA256 } = require('crypto-js')
// console.log(SHA256('TEST').toString(), 'TEST')

const jwt = require('jsonwebtoken')

var data = {
    id: 52
}

var token = jwt.sign(data, '123abc')
var decoded = jwt.verify(token, '123abc')

console.log(decoded)


// JSON Web Token support (JWTs) ^^


const bcrypt = require('bcryptjs')

var password = 'not hashed __ plain text'

var hash = bcrypt.hashSync(password, 15);

console.log(hash)

var bool = bcrypt.compareSync(password, hash)

console.log(bool)