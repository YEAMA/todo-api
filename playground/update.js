const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err)
        return console.log("unable to connect to the MongoDB server");

    console.log("Connected to the MongoDB server");

    db.collection('todos').findOneAndUpdate({
            _id: new ObjectID("592c9228199da728b44e1567")
        }, {
            $set: { //UPDATE OPERATOR
                completed: true
            }
        }, {
            returnOriginal: false
        })
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.error(err)
        })

});