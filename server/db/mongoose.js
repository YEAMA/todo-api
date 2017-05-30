const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://yeama:0mnblkj.sa@ds151451.mlab.com:51451/nodetodoapp')

module.exports.mongoose = mongoose;