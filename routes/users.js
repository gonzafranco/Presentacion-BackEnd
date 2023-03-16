var express = require('express');
var router = express.Router();

const { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuario } = require('../controller/usuariocontroller');


/* GET users listing. */


router.get("/", getUsuarios);

router.post("/", createUsuario);

router.put("/:usuario_id", updateUsuario);

router.delete("/:usuario_id", deleteUsuario);

router.get("/:usuario_id", getUsuario);

module.exports = router;
