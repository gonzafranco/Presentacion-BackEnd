var express = require('express');
var router = express.Router();


const {getRoles,getRol,createRol,updateRol,deleteRol } = require('../controller/rolcontroller');


router.get("/", getRoles);
router.get("/:id", getRol);
router.post("/", createRol);
router.put("/:id", updateRol);
router.delete("/:id", deleteRol);

module.exports = router;