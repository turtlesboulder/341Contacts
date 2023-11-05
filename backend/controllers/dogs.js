const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");
let objectId = require("mongodb").ObjectId;


let getAll = async (req, res)=>{
    // Database contactDB has collection contacts
    let result = await mongodb.getDatabase().db("contactDB").collection("contacts").find();
    result.toArray().then((contacts) =>{
        // Declare that the resulting content is json
        res.setHeader('Content-Type', 'application/json');
        // I'm not sure why I would be running the conversion to json on the status
        res.status(200).json(contacts);
    })
};

let getSingle = async (req, res)=>{
    let userId = new ObjectId(req.params.id);
    // Pass in a small object that just says the id. I am assuming this is like running a where query on that property,
    // so I could have also said color: orange or whatever
    let result = await mongodb.getDatabase().db("contactDB").collection("contacts").find({_id: userId});
    result.toArray().then((contacts) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
};

let getOrange = async (req, res)=>{
    let color = "Orange";
    // implementation of comment above
    let result = await mongodb.getDatabase().db("contactDB").collection("contacts").find({"favoriteColor": color});
    result.toArray().then((contacts) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
};

module.exports = {
    getAll, getSingle, getOrange
};