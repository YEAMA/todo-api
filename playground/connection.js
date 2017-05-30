const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
// console.log(obj.getTimestamp().toString())

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err)
        return console.log("unable to connect to the MongoDB server");

    console.log("Connected to the MongoDB server");

    // db.collection('todos').insertOne({
    //     tite: "The first thing",
    //     text: "This is the bla bla bla",
    //     completed: false
    // }, (error, result) => {
    //     if (error)
    //         return console.log("Unable to insert TODO", error);

    //     // console.log(JSON.stringify(result.ops, undefined, 3));
    //     console.log(result.ops[0]._id.getTimestamp().toString());
    // });

    db.close();
});