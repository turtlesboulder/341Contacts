const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");
let objectId = require("mongodb").ObjectId;


//add put, delete, etc.

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

let create = async(req, res)=>{
    //let userId = new ObjectId(req.params.id);
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    let response = await mongodb.getDatabase().db("contactDB").collection("contacts").insertOne( user);
    if (response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "An unknown error occured while updating the user.");
    }
    //console.log(req.body);
    //res.status(204).send();
};

let update = async(req, res)=>{
    let userId = new ObjectId(req.params.id);
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    let response = await mongodb.getDatabase().db("contactDB").collection("contacts").replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "An unknown error occured while updating the user.");
    }
};

let deleteEntry = async(req, res)=>{
    let userId = new ObjectId(req.params.id);
    let response = await mongodb.getDatabase().db("contactDB").collection("contacts").deleteOne({_id : userId});
    if (response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "An unknown error occured while updating the user.");
    }
};

module.exports = {
    getAll, getSingle, getOrange, create, update, deleteEntry
};