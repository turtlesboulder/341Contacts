const express = require("express");
const app = express();
//const app = require('express');
const router = express.Router();
const path = require('path');

router.use("/", require("./swagger"));

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});
// Was getting all sorts of errors until I used this __dirname stuff, file management is a nightmare
// so far node has just made things awful. I'm guessing its not so bad if we actually read a textbook...

router.use("/dogs", require("./dogs"));

module.exports = router;
// Why not just use the regular javascript modules?