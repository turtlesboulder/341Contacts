const app = require('express');
const router = app.Router();

const controller = require("../controllers/dogs");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteEntry);



module.exports = router;