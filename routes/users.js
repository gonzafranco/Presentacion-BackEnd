var express = require('express');
var router = express.Router();

const { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuario } = require('../controller/usuariocontroller');


/* GET users listing. */


router.get("/", getUsuarios);

router.post("/", createUsuario);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

router.get("/:id", getUsuario);

module.exports = router;
