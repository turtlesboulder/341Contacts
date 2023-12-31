const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const database = require("./backend/data/database");
// MongoDB


//const swaggerAutogen = require("swagger-autogen")();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");



const port = process.env.port || 8080;
// Presumably other applications can override this process.env.port here, and on my local computer it uses port 8080.
// I'm guessing this works because if process.env.port is not 0 (or null?) then it short circuits and doesnt check the 8080.
// Perhaps this is a bit too much ninja code and more explicit would be an if statement.

app.use(bodyParser.json()); //Chatgpt says this was only required in old versions

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key  ");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});







app.use('/', require("./backend/routes/index"));
// Get sends data, use sends somewhere else?


database.initDB((err)=>{
    // Connect to the database, if it fails, then don't even try to load the page.
    // Send the initDB a callback function that accepts one parameter
    if (err){
        console.log(err);
    }
    else{
        app.listen(port);
        // Can also log here if I want.
    }
})
// We seem to get a connection error until some time has passed... 


/* ====================== TODO =========================
make an interface to do all the operations.
Add put, delete, etc. operations
- make a form to add a new dog
Add swagger api to everything.



*/ 