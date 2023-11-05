const app = require('express');
const router = app.Router();

const controller = require("../controllers/dogs");

router.get("/", controller.getAll);
router.get("/orange", controller.getOrange) // doesn't work, if below ID then that breaks
router.get("/:id", controller.getSingle);


module.exports = router;