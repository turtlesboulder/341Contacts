const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send("I am a space hamster, burritos are food.");
});

const port = 3000;

app.listen(process.env.port || port);

console.log("Web server is listening at port " + (process.env.port || port));

