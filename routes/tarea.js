var express = require('express');
var router = express.Router();


const {getTareas,getTarea,createTarea,updateTarea,deleteTarea } = require('../controller/tareacontroller');


router.get("/", getTareas);
router.get("/:id", getTarea);
router.post("/", createTarea);
router.put("/:id", updateTarea);
router.delete("/:id", deleteTarea);

module.exports = router;