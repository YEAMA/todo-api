const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db) => {
    if (err)
        return console.error("Can't connect to Database");

    console.log("Connected to the MongoDB server");

    db.collection('todos').find().toArray().then((result) => {
            console.log(result);
            db.close();
        })
        .catch((e) => {
            console.log(e);
        });
});