const request = require('supertest')
const expect = require('expect')

const { app } = require('./../server')
const { Todo } = require('./../models/todo')

// beforeEach((done) => {
//     Todo.remove({}).then(() => done())
// })

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = "test todo test",
            title = "Title"

        request(app)
            .post('/todos')
            .send({ title, text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) return done(err)
                Todo.find()
                    .then((todos) => {
                        // expect(todos.length).toBe(1)
                        expect(todos[todos.length - 1].title).toBe(title)
                        done()
                    }).catch((e) => done(e))
            })
    });

    it('should not create todo with false data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBeGreaterThan(0)
                expect(res.body.status).toBe(200)
            })
            .end((e, res) => {
                if (e) return done(e);
                done();
            })
    })
})

describe('GET /todos/:title', () => {
    var title = 'Title';

    it('should return specific todos', (done) => {
        request(app)
            .get('/todos/Title')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBeGreaterThan(0)
            })
            .end((e, res) => {
                if (e) return done(e);
                done();
            })
    });

    title = null;

    it('should return 404 for nonfound', (done) => {
        request(app)
            .get('/todos/' + title)
            .expect(404)
            .expect((res) => {
                expect(res.error.text).toBe("No matched todos")
            })
            .end((e, res) => {
                if (e) return done(e);
                done();
            })
    });
});


describe('DELETE /todos/:title', () => {
    it('should delete todo by title', (done) => {
        request(app)
            .delete('/todos/' + 'From postman 3')
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe('From postman 3')
            })
            .end((e, res) => {
                if (e) return done(e)
                done()
            })
    });

    it('should not delete todo for unknown todo title', (done) => {
        request(app)
            .delete('/todos/' + 'From postman 3')
            .expect(404)
            .expect((res) => {
                expect(res.error.text).toBe("No matched todo to delete")
            })
            .end((e, res) => {
                if (e) return done(e)
                done()
            })
    });
})