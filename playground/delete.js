const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err)
        return console.log("unable to connect to the MongoDB server");

    console.log("Connected to the MongoDB server");


    // deleteMany || deleteOne || findOneAndDelete
    db.collection('todos').deleteMany({ text: "The first thing" }).then((res) => {
        console.log(res);
    }, (err) => {
        console.error(err)
    })

});