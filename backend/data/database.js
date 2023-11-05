const dotenv = require("dotenv");
// I don't know what this library does

dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;
let initDB = (callback)=>{
    // In server.js we made a function call to this initDB, now we are making the function here.
    if (database){
        console.log("Database is already initialized.");
        return callback(null, database);
        // Why two parameters? It looks like it only uses one in server.js.
    }

    MongoClient.connect(process.env.MONGODB_URL)
    .then((client)=>{
        database = client;
        callback(null, database);
    })
    .catch((err)=>{
        callback(err);
    })
};

let getDatabase = ()=>{
    if (!database){
        throw Error("Database not available!")
    }
    return database;
};

module.exports = {
    initDB, getDatabase
};