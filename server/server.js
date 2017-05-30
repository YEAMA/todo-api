const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose.js')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

var app = express()
const port = process.env.PORT || 3000;
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos, status: res.statusCode })
    }, (e) => {
        console.log(e)
        res.status.send(e)
    })
})

app.get('/todos/:title', (req, res) => {
    Todo.find({ title: req.params.title }).then((todos) => {
        if (todos.length === 0)
            res.status(404).send("No matched todos")
        res.send(todos)
    }, (e) => res.status(400).send(e))
})

app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})

module.exports = { app }