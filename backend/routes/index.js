const app = require('express');
const router = app.Router();

router.get('/', (req, res) =>{
    res.send("I am a space hamster")
});
router.use("/dogs", require("./dogs"));

module.exports = router;
// Why not just use the regular javascript modules?