var express = require('express');
var router = express.Router();

const { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuario } = require('../controller/usuariocontroller');
const {verifyToken}=require('../controller/auth-controller')

/* GET users listing. */


router.get("/",verifyToken, getUsuarios);

router.post("/", createUsuario);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

router.get("/:id", getUsuario);

module.exports = router;
