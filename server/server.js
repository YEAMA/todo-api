const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

const { mongoose } = require('./db/mongoose.js')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const { authenticate } = require('./middleware/authenticate')

var app = express()
const port = process.env.PORT || 3000;
app.use(bodyParser.json())

app.post('/users', (req, res) => {
    var userData = _.pick(req.body, ['email', 'password'])
    var user = new User(userData)

    user.save()
        .then((user) => {
            return user.generateAuthToken()
        })
        .then((token) => {
            res.header('x-auth', token).send(user)
        })
        .catch((e) => {
            res.status(400).send("Error occured: " + e)
        })
})

app.post('/user/login', (req, res) => {

    User.findByCredentials(req.body.email, req.body.password)
        .then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user)
            })
        })
        .catch((e) => res.status(400).send(e))
})


app.get('/user/me', authenticate, (req, res) => {
    res.send(req.user)
})

app.delete('/user/me/', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => {
            res.send("Token deleted successfully")
        }, (e) => {
            res.status(400).send("Error!")
        })

})

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        title: req.body.title,
        text: req.body.text
    })

    todo.save()
        .then((doc) => {
            res.status(200).send(doc)
        }, (e) => {
            res.status(400).send(e)
        })
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos, status: res.statusCode })
    }, (e) => {
        res.status.send(e)
    })
})

app.get('/todos/:title', authenticate, (req, res) => {
    Todo.find({ title: req.params.title }).then((todos) => {
        if (todos.length === 0)
            return res.status(404).send("No matched todos")
        res.send(todos)
    }, (e) => res.status(400).send(e))
})

app.delete('/todos/:title', authenticate, (req, res) => {
    Todo.findOneAndRemove({ title: req.params.title }).then((doc) => {
        if (!doc)
            return res.status(404).send('No matched todo to delete')

        res.status(200).send(doc);
    }, (e) => res.status(400).send(e))
})

app.patch('/todos/:title', authenticate, (req, res) => {
    var title = req.params.title;
    var body = _.pick(req.body, ['title', 'text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime()
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ title }, { $set: body }, { new: true })
        .then((doc) => {
            if (!doc)
                return res.status(404).send('No todo found to update')

            res.status(200).send({ doc })
        }, (e) => res.status(400).send(e))
})

app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})

module.exports = { app }